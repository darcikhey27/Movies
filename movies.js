
$(document).ready(init);

function init() {
	
    $.ajaxSetup({ cache: false});
    
    hideForm();
    $("#btn-add").on("click", addMovie);
    $("#btn-show-all").on("click", showAll);
    $("#btn-save").on("click", saveMovie);
    $("#btn-cancel").on("click", hideForm);

    $("textarea").attr("readonly", "true");

    // fire up event listeners for dinamically generated buttons
    $("body").on("click", ".btn-edit", editRow);
    $("body").on("click", ".btn-delete", deleteRow);
}


function addMovie() {
    $("#status").html("adding movie");
    showForm();
}
function saveMovie(evt) {
    // save movie to database
    // TODO: clear the tables movie first then display all
    
    var name = $(".form-group #name").val();
    var studio = $(".form-group #studio").val();
    var year = $(".form-group #year").val();
    var description = $(".form-group #description").val();
    var price = $(".form-group #price").val();
    //if(validate(name, studio, description, price)

    $.ajax({
        type: 'POST',
        url: 'services/add.php',
        data: {
            "name": name,
            "studio": studio,
            "year": year,
            "description": description,
            "price": price
        },
        success: function (response) {
            alert(response);
        }
    });
    hideForm();
}
// show all the movies
function showAll(evt) {
    hideForm();
    $.getJSON("./services/showAll.php", function (data) {
        var count = Object.keys(data).length;

        for (var i = 0; i < count; i++) {
            //console.log(data[i]);
            var id = data[i]["id"];
            var name = data[i]["name"];
            var year = data[i]["year"];
            var studio = data[i]["studio"];
            var description = data[i]["description"];
            var price = data[i]["price"];

            $("#myTable").append("<tr id='tr"+id+"'></tr>")
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+id+"</textarea></td>");
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+name+"</textarea></td>");
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+year+"</textarea></td>");
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+studio+"</textarea></td>");
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+description+"</textarea></td>");
            $("#myTable tr:last").append("<td><textarea class='form-control' rows='2'>"+price+"</textarea></td>");
            $("#myTable tr:last").append("<td><button class='btn btn-primary btn-edit'>edit</button><button class='btn btn-danger btn-delete'>delete</button></td>");

            $(".btn-edit:last").attr("id", id);
            $(".btn-delete:last").attr("id", id);

           // $("#myTable textarea").attr("style", "background-color: #2C3E50");
           // $("#myTable textarea").attr("style", "color: white");
           // $("#input-"+id).val(id);
           $("#myTable textarea").attr("readonly", "readonly");
        }
    });
    $("#btn-show-all").prop("disabled", "true")
}

function deleteRow(evt) {
    var movieID = evt.target.id;
    var res = confirm("Delete movie??");
    if(res != true ) {
        return;
    }
    $.ajax({
        type: "POST",
        url: 'services/delete.php',
        data: {"id" : movieID},
        success: function (response) {
            alert(response);

           $("tbody").remove();
            console.log("Removed all movies");
            showAll();
        }
        
    });
    

}

function editRow(evt) {
    console.log("clicked button");
    var btnID = evt.target.id;
    var tablerow = "#tr" + btnID;
    //console.log(tablerow);
    //console.log("#tr"+btnID);
    $("#tr"+btnID+" textarea").attr("readonly", false);
   
    if($("#"+btnID).html() == "Save") {
        var arrayElements = [];
        $("#"+btnID).on("click", function() {
            console.log("clicked saved button");
            $(tablerow).children("td").children("textarea").each(function(evt) { 
                console.log($(this).val());
                arrayElements.push( $(this).val() );
            });
            console.log(arrayElements[0]);
            var id = arrayElements[0];
            var name = arrayElements[1];
            var year = arrayElements[2];
            var studio = arrayElements[3];
            var description = arrayElements[4];
            var price = arrayElements[5];
            console.log("name is "+ name+ " year is "+ year+ " studio is "+studio+ " description is "+ description+ " price is "+ price);
            $.ajax({
                type: "POST",
                url: 'services/update.php',
                data: {"id" : id,
                        "name": name,
                        "year": year,
                        "studio": studio,
                        "description": description,
                        "price": price
                    },
                success: function (response) {
                    alert(response);

                    $("tbody").remove();
                    console.log("Removed all movies");
                    showAll();
                }
            });

        });
        
    }
    else {
        console.log("in else");
        $("#"+btnID).html("Save");
    }
    
}

function showForm() {
    $(".hider").show();
    $(".form-group #name").focus();
    $("input").val("");
}
function hideForm() {
    // TODO::..remove all existing fields from input fields
    $(".hider").hide();
}
