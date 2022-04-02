# find-n-remove

find-n-remove is a Node script for deleting files or folders in a folder

## Installation

```bash
npm i find-n-remove
```

## Usage

```javascript
import FindNRemove from 'find-n-remove'

const findNRemove = new FindNRemove({
    to_delete_name: 'i_will_be_deleted',
    is_recursive: false,
    to_delete_path: 'path_where_to_delete'
})

findAndRemove.proceed()
```

## Options

| option         | required | type    | description                   | default |
|----------------|----------|---------|-------------------------------|---------|
| is_recursive   | false    | boolean | Is recursive mode             | false   |
| to_delete_name | true     | string  | File or folder name to delete | -       |
| to_delete_path | true     | string  | Path where to delete          | -       |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)