var params = [ 
    {
        field_name : "param1",
        field_value : "jasgdjasd"
    }, 
    {
        field_name : "param2",
        field_value : "abc"
    }, 
    {
        field_name : "param3",
        field_value : "mn"
    }, 
    {
        field_name : "param4",
        field_value : "something"
    }, 
    {
        field_name : "params8",
        field_value : "hasjdhasd"
    }
]

var test = {}

params.forEach(obj=>{
    test[obj.field_name] = obj.field_value
});

console.log(test);