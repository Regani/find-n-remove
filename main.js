import path from 'path'
import fs from 'fs'

const logger = {
    log: (...message) => {
        console.log(...message)
    }
}

const initialStats = {
    success: {
        total: 0,
        list: []
    },
    errored: {
        total: 0,
        list: []
    }
}

class FindNRemove {
    options

    stats = {...initialStats}

    constructor(options) {
        this.options = options
    }

    proceed() {
        this.delete()
        logger.log('Finished', this.stats)
        this.stats = {...initialStats}
    }

    delete() {
        const recursiveDelete = (directoryPath) => {
            const toDelete = path.join(directoryPath, this.options.to_delete_name)
            logger.log('Will delete', toDelete)

            if (fs.existsSync(toDelete)) {
                logger.log('Deleting:', toDelete)
                fs.rmSync(toDelete, {force: true, recursive: true})
                this.stats.success.total++
                this.stats.success.list.push(toDelete)
            }

            if (this.options.is_recursive) {
                fs.readdirSync(directoryPath).forEach((file, index) => {
                    const curPath = path.join(directoryPath, file)

                    if (fs.lstatSync(curPath).isDirectory()) {
                        try {
                            recursiveDelete(curPath)
                        } catch (e) {
                            logger.log('Something went wrong')
                            this.stats.errored.total++
                            this.stats.errored.list.push(curPath)
                        }
                    }
                })
            }
        }

        try {
            recursiveDelete(this.options.to_delete_path)
        } catch (e) {
            logger.log('Something went wrong')
            this.stats.errored.total++
            this.stats.errored.list.push(path)
        }
    }
}

export default FindNRemove
