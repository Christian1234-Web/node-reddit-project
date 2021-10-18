let formAdLogin = $("#formAdLogin"),
    btnAdminLogin = $("#btnAdminLogin"),
    formAdCreate = $("#formAdCreate"),
    btnCreateAd = $("#btnCreateAd");
btnDeleteAdmin = $("#btnDeleteAdmin"),
    adminUsername = $("#adminUsername"),
    adminEmail = $("#adminEmail"),
    adminPassword = $("#adminPassword"),

    adminUsernameC = $("#adminUsernameC"),
    adminEmailC = $("#adminEmailC"),
    adminPasswordC = $("#adminPasswordC"),
    error_msg = $("#error_msg"),
    admin_user = $("#admin_user");
    let dataId;

    getAdminsCted();
    
function createAdmin() {
   
    $.ajax({
        type: "POST",
        url: "http://localhost:3006/admin_user",
        data: {
            "username": adminUsernameC.val(),
            "email": adminEmailC.val(),
            "password":adminPasswordC.val()
        },
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            if (res.status == "ok") {
                console.log(res);
                window.location = "LoginAdmin"
            } else {
                console.log(res.error);
                error_msg.html(res.error);
            }
			
        }

    })
};

function logAdmin() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3006/admin_login",
        data: {
            "email": adminEmail.val(),
            "password": adminPassword.val()
            
        },
        error: function(err) {
            console.log('Login admin failed');
        },
        success: function (res) {
            console.log(res);
            if (res.status == "ok") {
                console.log("successfully logged in", res);
                localStorage.setItem("admin_id", res.data._id);
                localStorage.setItem("admin_name", res.data.username);
                let admin_username = localStorage.getItem("admin_name");
                admin_user.html(admin_username);
                window.location = "Dashboard"
            } else {
                console.log(res.error);
                error_msg.html(res.error);
            }
           
        }

    })
    
}
 

function logoutAdmin() {
    let admin_username = localStorage.getItem("admin_name");
    let admin_id = localStorage.getItem("admin_id");
    if (admin_id) {
        $.ajax({
            type: "PUT",
            url: "http://localhost:3006/logout/" + admin_id,
            data: {
                "active": false
            },
            error: function(err) {
                console.log(err);
            },
            success: function (res) {
                console.log(res);
                if (res.status == "ok") {
                    let admin_id = localStorage.clear("admin_id");
                    let admin_name = localStorage.clear("admin_name");
                    console.log("successfully logged out", res.data);
                    window.location = "/";
                } else {
                    console.log(res.error);
                    error_msg.html(res.error);
                }
                
            }
    
        })
    } else {
        error_msg.html("You have already logged out");
 
}

};
 

// Get created admins
function getAdminsCted() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3006/admin_users",
        error: function(err) {
            // alert('Error while uploading users')
            console.log('No INTERNET CONNECTION')
        },
		success: function (res) {
			console.log("get created admins", res);
		
        }

    })
};


