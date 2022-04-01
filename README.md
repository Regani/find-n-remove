# find-n-remove

find-n-remove is a Node script for deleting files or folders in a folder

## Installation

Clone project:

```bash
git clone https://github.com/Regani/find-n-remove.git

cd find-n-remove
```

## Usage

Run in your terminal as sudo:

```bash
node main.js -r --name=file_to_delete ./
```

## Arguments

| option  | optional | example                   | description                   |
|---------|----------|---------------------------|-------------------------------|
| -r      | true     | -r                        | Is recursive mode             |
| --name= | false    | --name=file_to_delete.txt | File or folder name to delete |
| -       | false    | ./                        | Path where to delete          | 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)