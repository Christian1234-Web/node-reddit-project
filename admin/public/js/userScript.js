let userName = $("#userName"),
	userEmail = $("#userEmail"),
	userPassword = $("#userPassword"),
	btnUpdate = $("#btnUpdate"),
	btnEditUser = $("#btnEditUser"),
	viewUser = $("#viewUser"),
	editForm = $("#editForm"),
	userSum = $("#userSum");
let usersCount = 0;
	// testing
let productID;

let ud = $('.ud');
let user_logged = localStorage.getItem("user_id");
editForm.hide();
loadProductData();
// $(document).ready(() => {
//     preventDefault();
//     
//     if (!user_logged) {
//         window.location = "/";
//     } else {
//         window.location = "/dashboard";
//     }
// })

function createUser() {
   
    $.ajax({
        type: "POST",
        url: "http://localhost:3006/users",
        data: {
            "username": userName.val(),
            "email": userEmail.val(),
            "password":userPassword.val()
        },
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            if (res.status == "ok") {
                console.log(res);
                window.location = "/users"
            } else {
                console.log(res.error);
                error_msg.html(res.error);
            }
			
        }

    })
};
function loadProductData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3006/users",
        error: function(err) {
            alert('Error while uploading users')
            console.log('No INTERNET CONNECTION')
        },
        success: function (res) {
            
			console.log(res);
			
			let row = '';
			let usersCountArr = [];
            for (let i = 0; i < res.length; i++) {
				usersCount++
				row += ` <tr >
				<td class=" ">${usersCount}</td>
            <td>${res[i].username}</td>
            <td >${res[i].email}</td>
            <td>${res[i].password}</td>
            <td>${res[i].active}</td>

             <td>
			 <a href = "#" class="edith" id="updt" dataId="${res[i]._id}"
             userName="${res[i].username}"
             userEmail="${res[i].email}"
             userPassword="${res[i].password}"
             >Edit</a>|
             <a href="#" class="delete" id="delte" dataId="${res[i]._id}"
        
             >Delete</a>
             </td>
            </tr>`
			
            }
            ud.html(row);
			usersCountArr.push(usersCount);

			let usersCountSum = usersCountArr.reduce((a, b) => console.log(usersCountSum));
			userSum.html(usersCountSum);
			console.log(usersCountSum,usersCountArr)
		
        }

    })
};


ud.on('click', '.edith', function() {
    dataId = $(this).attr('dataId');
	console.log(dataId);
    userName.val($(this).attr('userName'));
    userEmail.val($(this).attr('userEmail'));
    userPassword.val($(this).attr('userPassword'));
	viewUser.hide();
    editForm.show();
    console.log(userName.val(), userEmail);
});

// function testBtn() {
// 	btnEditUser.hide();
// }
// update function

function updateUser() {
    let data = {
        username: $('#userName').val(),
        email: $('#userEmail').val(),
        password: $('#userPassword').val()

    }

    $.ajax({
        type: 'PUT',
		url: "http://localhost:3006/users/" + dataId,
        data: data,
       
        error: function(err) {
            alert("Error Updating User")
            console.log('not successful updating a user')
        },
        success: function(res) {
            alert('Update Successful')
            console.log('update successful', res);
            window.location = "/users"
        }
    })

};
// update button

btnUpdate.click(function(e) {
    let userID = $('#btnUpdate').attr('dataId')
    updateUser();
    e.preventDefault;

    loadProductData();
});

// delete function

function deleteUser() {
	if (window.confirm('Are you sure?'));
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3006/users/" + dataId,
        error: function(err) {
            console.log('not successful')
        },
        success: function(res) {
            console.log('successful')
        }
       
    })
}


// delete button

ud.on('click', '.delete', function () {
    dataId = $(this).attr('dataId');
    deleteUser();
    loadProductData();
});


