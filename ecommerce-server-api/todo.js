/* 
desired-output

erros = [
    {
        "value": "",
        "msg": "the field is required.",
        "param": "name",
        "location": "body"
    },
    {
        "value": "ord",
        "msg": "must be atleast 8 characters",
        "param": "password",
        "location": "body"
    },
    
]

*/



// +________________________________

/* 
"errors": {
        "password": {
            "name": "ValidatorError",
            "message": "Path `password` is required.",
            "properties": {
                "message": "Path `password` is required.",
                "type": "required",
                "path": "password"
            },
            "kind": "required",
            "path": "password"
        },
        "email": {
            "name": "ValidatorError",
            "message": "Path `email` is required.",
            "properties": {
                "message": "Path `email` is required.",
                "type": "required",
                "path": "email"
            },
            "kind": "required",
            "path": "email"
        },
        "name": {
            "name": "ValidatorError",
            "message": "Path `name` is required.",
            "properties": {
                "message": "Path `name` is required.",
                "type": "required",
                "path": "name"
            },
            "kind": "required",
            "path": "name"
        }
    }

*/
