$(document).ready(function() {
    $('#menu').kendoMenu({
        dataSource: [
            {
                text: 'Home',
                items: [
                    {
                        text: 'Students'
                    },{
                        text: 'Teachers'
                    },{
                        text: 'Staff'
                    },

                ]
            },
            {
                text: 'Home',
                items: [
                    {
                        text: 'Students'
                    },{
                        text: 'Teachers'
                    },{
                        text: 'Staff'
                    },

                ]
            }
        ]
    });


    $("#student-grid").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: '/students/',
                    dataType: 'json'
                },
                update:{
                    url: '/students/',
                    dataType: 'json',
                    contentType: 'application/json',
                    type: 'put',
                    data: {
                        csrf_token: 'token',
                    }
                },
                destroy: {
                    url: '/students/',
                    dataType: "jsonp",
                    type: 'delete',
                },
                create: {
                    url: '/students/',
                    dataType: "jsonp",
                    type: 'post'
                },
                parameterMap: function (data, type){
                    console.log(data);
                    console.log(type);

                    return {models: kendo.stringify(data.models)};
                }
            },
            schema: {
                model: {
                    fields:{
                        uid: {
                            type: 'string'
                        },
                        first_name: {
                            type: 'string'
                        },
                        last_name: {
                            type: 'string'
                        },
                        fathers_name: {
                            type: 'string'
                        },
                        dob: {
                            type: 'string'
                        },
                        gender: {
                            type: 'string'
                        },
                        // image: {type: 'string'},
                        grade_id: {
                            type: 'string'
                        },
                        national_id: {
                            type: 'string'
                        },
                    }
                },
                parse: function (response) {
                    // ECMA Script 6 block scoped variable                    
                    let s= [];

                    for (let i = 0; i < response.length; i++){

                        let fields = response[i].fields;
                        fields.uid = response[i].pk;

                        s.push(fields);

                    }

                    console.log(s);
                    return s;
                    
                }
            }
        },
        height: 550,
        groupable: true,
        sortable: true,
        editable: 'popup',
        columns: [
        {
            field: 'uid',
            title: 'ID'
        },    
        {
            template: "<div class='customer-photo'" +
            "style='background-image: url(/media/#:image#);'></div>" +
            "<div class='customer-name'>#:first_name #</div>",
            field: "first_name",
            title: "First Name",
            width: 240
        }, {
            field: "last_name",
            title: "Last Name"
        }, {
            field: "fathers_name",
            title: "Father's Name"
        }, {
            field: "dob",
            title: 'DOB'
        },
        {
            field: "gender",
            title: 'Gender'
        },{
            command: ['edit', 'destroy'],
            title: 'Action',
            width: 300
        }
    ]
    });


});