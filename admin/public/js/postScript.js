let postTitle = $("#postTitle"),
	postImg = $("#postImg"),
	postDescription = $("#postDescription"),
	btnPostUpdate = $("#btnPostUpdate"),
	postSum = $("#postSum"),
	viewPost = $("#viewPost"),
	postEdit = $("#postEdit");
	let count = 0;
let pd = $('.pd');
postEdit.hide();
loadProductData();

function createPost() {
   
    $.ajax({
        type: "POST",
        url: "http://localhost:3006/posts",
        data: {
            "title": postTitle.val(),
            "image": postImg.val(),
            "description":postDescription.val()
        },
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            if (res.status == "ok") {
                console.log(res);
                window.location = "/posts"
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
        url: "http://localhost:3006/posts",
        error: function(err) {
            alert('Error while uploading data')
            console.log('wow')
        },
        success: function(res) {
			let row = '';
			let countArr = [];
            for (let i = 0; i < res.length; i++) {
				count++
				row += ` <tr>
				<td>${count}</td>
                <td ><img src="${res[i].image}" height="30" width="30"></td>
            <td>${res[i].title}</td>
            <td>${res[i].description}</td>
			<td>${res[i].num_comment}4
            </td>
            <td>${res[i].num_like}</td>
			<td>${new Date(res[i].time_created).toDateString()}</td>

             <td class="col"><a href = "#" class="edit" id="updt" dataId="${res[i]._id}"
              postImg="${res[i].image}"
              postTitle="${res[i].title}"
              postDescription="${res[i].description}"
             >Edit</a>|
             
             <a href="#" class="delete" id="delte" dataId="${res[i]._id}">Delete</a> </td>
            </th>`

			}
			countArr.push(count);

			let countSum = countArr.reduce((a, b) => console.log(countSum));
			postSum.html(countSum);
			console.log(countSum, countArr);
			pd.html(row);

        }

    })
};

// edit button // function

pd.on('click', '.edit', function() {
    dataId = $(this).attr('dataId');
    postImg.val($(this).attr('postImg'));
	postTitle.val($(this).attr('postTitle'));
  let x =  postDescription.val($(this).attr('postDescription'));
		viewPost.hide();
    postEdit.show();
    console.log(dataId,postImg,postDescription.val(),postTitle,x)
    // loadProductData();
});


// update function

function updateProduct() {
    let data = {
        title: $('#postTitle').val(),
        image: $('#postImg').val(),
        description: $('#postDescription').val()
    }
	// let dataId = $('#btnPostUpdate').attr('dataId');

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3006/posts/' + dataId,
        data: data,
        success: function(res) {
            alert('Updating Successful')
            loadProductData()
        },
        error: function(err) {
            alert("Error Updating Product")
        }
    })

};
// update button

btnPostUpdate.click(function(e) {
    let dataId = $('#btnPostUpdate').attr('dataId');
    e.preventDefault;
    updateProduct();
    // loadProductData();
});

// delete function

function deleteProduct() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3006/posts/" + dataId,
        success: function(res) {
            alert('Product Deleted');
            loadProductData();
        },
        error: function(err) {
            alert('Product not Deleted');
        }
    })
}


// delete button

pd.on('click', '.delete', function() {
    // dataId = " ";
	dataId = $(this).attr('dataId');
	console.log(dataId)
	deleteProduct();
	
    // res.splice(dataId, 1);
    // loadProductData();

});


