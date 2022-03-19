const path = require('path')
const fs = require('fs')

const logger = {
    log: (...message) => {
        console.log(...message)
    }
}

const ENUM = {
    TO_DELETE_TYPES: {
        FILE: 'file',
        FOLDER: 'folder'
    }
}

class FindNRemove {
    arguments

    to_delete_name
    to_delete_type
    to_delete_path
    is_recursive

    deleted_count = 0

    constructor(args) {
        this.arguments = args
    }

    init() {
        this._setToDeleteName()
        this._setToDeleteType()
        this._setToDeletePath()
        this._setIsRecursive()
    }

    proceed() {
        this.delete(this.to_delete_path)
        logger.log('Successfully deleted', this.deleted_count, 'items')
        this.deleted_count = 0
    }

    delete(directoryPath) {
        const toDelete = path.join(directoryPath, this.to_delete_name)

        if (fs.existsSync(toDelete)) {
            logger.log('Deleting:', toDelete)
            fs.rmSync(toDelete, {force: true, recursive: true})
            this.deleted_count++
        }

        if (this.is_recursive) {
            fs.readdirSync(directoryPath).forEach((file) => {
                const curPath = path.join(directoryPath, file)

                if (fs.lstatSync(curPath).isDirectory()) {
                    this.delete(curPath);
                }
            })
        }
    }

    _getToDeleteNameArgumentIndex(args) {
        return args.findIndex(arg => arg.includes('--name='))
    }

    _setToDeleteName() {
        const toDeleteNameArgumentIndex = this._getToDeleteNameArgumentIndex(this.arguments)

        if (toDeleteNameArgumentIndex === -1) throw new Error('The --name= argument must be passed')

        const nameArgument = this.arguments[toDeleteNameArgumentIndex]

        this.to_delete_name = nameArgument.split('=')[1]

        logger.log('Will delete file with name:', this.to_delete_name)
    }

    _getIsRecursiveIndex(args) {
        return args.findIndex(arg => arg === '-r')
    }

    _setIsRecursive() {
        const isRecursiveIndex = this._getIsRecursiveIndex(this.arguments)

        this.is_recursive = isRecursiveIndex !== -1

        logger.log('Is recursive:', this.is_recursive)
    }

    _setToDeletePath() {
        const executedFrom = process.cwd()
        const argumentsCopy = [...this.arguments]

        if (this._getIsRecursiveIndex(argumentsCopy) !== -1) {
            argumentsCopy.splice(this._getIsRecursiveIndex(argumentsCopy), 1)
        }

        if (this._getToDeleteNameArgumentIndex(argumentsCopy) !== -1) {
            argumentsCopy.splice(this._getToDeleteNameArgumentIndex(argumentsCopy), 1)
        }

        let deleteIn = argumentsCopy[argumentsCopy.length - 1]

        if (deleteIn === undefined) {
            deleteIn = './'
        }

        this.to_delete_path = path.join(executedFrom, deleteIn)

        if (!fs.existsSync(this.to_delete_path)) throw new Error('No such folder ' + this.to_delete_path)

        logger.log('Will delete in:', this.to_delete_path)
    }

    _setToDeleteType() {
        const isFile = this.to_delete_name.split('.').length > 1

        if (isFile) {
            this.to_delete_type = ENUM.TO_DELETE_TYPES.FILE
        } else {
            this.to_delete_type = ENUM.TO_DELETE_TYPES.FOLDER
        }

        logger.log('To delete type:', this.to_delete_type)
    }
}

const findNRemove = new FindNRemove(process.argv)

findNRemove.init()
findNRemove.proceed()