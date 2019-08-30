$(document).ready(function() {


    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');


    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    

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
                    dataType: 'jsonp',
                    // contentType: 'application/json',
                    type: 'post',
                    // data: {
                    //     csrf_token: 'token',
                    // }
                },
                destroy: {
                    url: '/students/',
                    dataType: "json",
                    type: 'delete',
                },
                create: {
                    url: '/students/',
                    dataType: "json",
                    type: 'post'
                },
                parameterMap: function (data, operation){
                    
                    console.log(data);
                    console.log(operation);

                    return kendo.stringify([{model: 'student.student', fields:data}]);
                }
            },
            schema: {
                model: {
                    id: 'uid',
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
                        image: {type: 'string'},
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
                    let s = [];

                    for (let i = 0; i < response.length; i++){

                        let fields = response[i].fields;
                        fields.uid = response[i].pk;

                        s.push(fields);

                    }

                    // console.log(s);
                    return s;
                    
                }
            }
        },
        height: 550,
        groupable: true,
        sortable: true,
        editable: {
            mode: 'popup',
            template: kendo.template($('#student-view').html()),
            window: {
                actions: ['Maximize', 'close', 'Minimize'],
                width: '70%'
            }
            
        },
        toolbar: ['create'],
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
    ],
    edit: function(){

        let originalURL = $('#image-preview').attr('src');

        function onFileInputSelect(e){

            console.log('onchange fired on image-input');

            let reader = new FileReader();
            // inputElement = e.target;

            reader.onload = function(e){

                $('#image-preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(e.files[0].rawFile);


        };

        function onFileInputRemove(e){

            console.log('remove fired on image-input');
            console.log(e.files.length);
            if (e.files.length === 1){
                $('#image-preview').attr('src', originalURL);
                return;
            }
                
                

            let reader = new FileReader();
            // inputElement = e.target;

            reader.onload = function(e){

                $('#image-preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(e.files[e.files.length - 1].rawFile);


        };

        $('#datepicker').kendoDatePicker();
        $('#gender-select').kendoDropDownList();
        $('#image-input').kendoUpload({
            remove: onFileInputRemove,
            select: onFileInputSelect
        });
        $('#grade-select').kendoDropDownList({
            dataTextField: 'name',
            dataValueField: 'uid',
            dataSource: {
                transport: {
                    read: {
                        dataType: 'json',
                        url: '/grades/'
                    }
                },
                schema: {
                    parse: function (response){

                        let grades = [];

                        for (let i = 0; i < response.length; i++)
                            grades.push({
                                uid: response[i].pk,
                                name: response[i].fields.name
                            });

                        return grades;
                    }
                }
            }
        });

        

    },
    save: function (e) {  


        console.log(e.model.isNew());

        let form = $('#student_edit_view_form')[0];

        let data = new FormData(form);

        data.append('uid', e.model.id);

        $.ajax({
            type: 'POST',
            url: '/students/',
            data: data,
            processData: false,
            contentType: false,
        });

        e.preventDefault();
    }
    });

    

});