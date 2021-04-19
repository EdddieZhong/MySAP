import API from './api.js';
// A helper you may want to use when uploading new images to the server.
// import { fileToDataUrl } from './helpers.js';

// This url may need to change depending on what port your SAP_backend is running
// on.

//             "username": "airsind",
//             "password": "7189",

const api = new API('http://127.0.0.1:5000');


let theToken = null;
let currentUsername = null;
let currentUserID = null;
let base_code = null;


// this is a help function to clear tables
function clearInputFields(command){
    if (command) {
        if (command === "clearRegister"){
            document.getElementById("register-username").value = "";
            document.getElementById("register-password").value = "";
            document.getElementById("confirm-register-password").value = "";
            document.getElementById("register-email").value = "";
            document.getElementById("register-real-name").value = "";
        }else if (command === "clearLogin"){
            document.getElementById("login-username").value = '';
            document.getElementById("login-password").value = '';
        }else if (command === "clearNewPost"){
            document.getElementById('new-post-input-field').value = "";
            document.getElementById('file-upload-button').value = "";
        }else if (command === "clearUpdateProfile"){
            document.getElementById("update-email").value = "";
            document.getElementById("update-password").value = "";
            document.getElementById("update-real-name").value = "";
        }
    }else{
        //clear login table
        document.getElementById("login-username").value = '';
        document.getElementById("login-password").value = '';
        // clear register table
        document.getElementById("register-username").value = "";
        document.getElementById("register-password").value = "";
        document.getElementById("confirm-register-password").value = "";
        document.getElementById("register-email").value = "";
        document.getElementById("register-real-name").value = "";
        // clear new post area
        document.getElementById('new-post-input-field').value = "";
        document.getElementById('file-upload-button').value = "";
        // clear update profile input
        document.getElementById("update-email").value = "";
        document.getElementById("update-password").value = "";
        document.getElementById("update-real-name").value = "";
    }
}

// =========================================== Log In ===============================================

        //  error message
const logError = errorLog => {
    document.getElementById('register-error-info-show-box').style.display = 'block';
    document.getElementById('register-error-info-text').innerHTML = errorLog;
};

const login = token => {

    theToken = token;
    document.getElementById('main_frame').style.background = 'pink';
    document.getElementById('banner-follow-button-box').style.display = 'block';
    document.getElementById('banner-follow-input-box').style.display = 'block';
    document.getElementById('logged-in-welcome-info-show').style.display = 'none';
    document.getElementById('banner-main-page-button-box').style.display = 'block';
    document.getElementById('banner-new-post-button-box').style.display = 'block';
    document.getElementById('banner-refresh-button-box').style.display = 'block';
    document.getElementById('banner-profile-button-box').style.display = 'block';
    document.getElementById('banner-logout-button-box').style.display = 'block';
    document.getElementById('not-logged-in-state-box').style.display = 'none';
    document.getElementById('banner-login-button-box').style.display = 'none';
    document.getElementById('banner-update-profile-button-box').style.display = 'none';

    let currentUsername = ""
    api.get('user/', {
            headers: {
                Authorization: `Token ${theToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(data => {
            currentUserID = data.id;
            currentUsername = data.username;
            console.log(currentUserID);
            console.log(data);
            document.getElementById("main-info-show").innerHTML = `welcome back! ${currentUsername}`;
            document.getElementById("main-info-show").style.display = "block";
            document.getElementById("feed-box").innerHTML="\n to me continued...";
            document.getElementById('feed-box').style.display = 'block';
            document.getElementById("banner-login-button-box").style.display = "none";
        })
        .catch(err => {
            alert(err);
        });

}

function loginSubmitPress() {

    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
    api.post('auth/login', {
        body: JSON.stringify({
            "username": loginUsername,
            "password": loginPassword,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => {
            console.log('TOKEN: ', data) // token
            login(data.token);
        })
        .then(() => {
            getFeedOfUser(theToken);
        })
        .catch(err => {
            alert(err)
        });
    // console.log('login click ', loginUsername, loginPassword);
}


// login event listener
document.getElementById('login-submit-button').addEventListener('click', loginSubmitPress);

function loginButtonClick() {
    document.getElementById('not-logged-in-state-box').style.display = 'block';
    document.getElementById('register-box').style.display = "none";
    document.getElementById("new-post-box").style.display="none";
    // clear the login box
    document.getElementById("login-box").style.display = "block";
    clearInputFields("clearLogin");
}

// to login event
document.getElementById('banner-login-button').addEventListener('click', loginButtonClick)

// =========================================== Log Out ===============================================

const logout = () => {
    theToken = null;
    // show logout success
    document.getElementById("main-info-show").innerHTML = `logout successfully`;
    document.getElementById("main-info-show").style.display = "block";

    // main frame to white --> logout
    document.getElementById('main_frame').style.background = 'white';


    document.getElementById("register-box").style.display="none";
    // show login box and reset the table
    document.getElementById("login-box").style.display = "block";
    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';

    document.getElementById('banner-login-button-box').style.display = 'block';
    document.getElementById('not-logged-in-state-box').style.display = 'block';

    document.getElementById("new-post-box").style.display="none";
    document.getElementById('banner-logout-button-box').style.display = 'none';
    document.getElementById('feed-box').style.display = 'none';
    document.getElementById('banner-follow-button-box').style.display = 'none';
    document.getElementById('banner-follow-input-box').style.display = 'none';
    document.getElementById('logged-in-welcome-info-show').style.display = 'none';
    document.getElementById('banner-main-page-button-box').style.display = 'none';
    document.getElementById('banner-new-post-button-box').style.display = 'none';
    document.getElementById('banner-refresh-button-box').style.display = 'none';
    document.getElementById('banner-profile-button-box').style.display = 'none';
    document.getElementById('update-profile-box').style.display = 'none';
    document.getElementById("user-profile-box").style.display="none";

};
// logout event
document.getElementById('banner-logout-button').addEventListener('click',logout);



// =========================================== Register ===============================================

    //click to close the info of register
document.getElementById("close-welcome-register-button").addEventListener('click', x=>{
    document.getElementById("welcome-register-info-show").style.display= "none";
})

document.getElementById('register-error-info-close-button').addEventListener('click', x => {
    document.getElementById('register-error-info-show-box').style.display = 'none';
})

    // register start event
function registerEvent(){
    document.getElementById('not-logged-in-state-box').style.display = 'none';
    document.getElementById('logged-in-welcome-info-show').style.display = 'none';
    document.getElementById('feed-box').style.display = 'none';
    document.getElementById('user-profile-box').style.display = 'none';
    document.getElementById('usersPosts').style.display = 'none';
    document.getElementById('new-post-box').style.display = 'none';
    document.getElementById('update-profile-box').style.display = 'none';
    //show boxes
    document.getElementById('register-box').style.display = "block";
    document.getElementById("close-welcome-register-button").style.display="inline-block";
    document.getElementById('banner-login-button-box').style.display = 'block';
    // clear the register table
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
    document.getElementById("confirm-register-password").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-real-name").value = "";

}

document.getElementById('banner-signup-button').addEventListener('click', registerEvent)

    // submit registration
function registerSubmit() {
    const registerUsername = document.getElementById('register-username').value;
    const registerPassword1 = document.getElementById('register-password').value;
    const registerPassword2 = document.getElementById('confirm-register-password').value;
    const registerEmail = document.getElementById('register-email').value;
    const registerRealname = document.getElementById('register-real-name').value;
    if (registerUsername === ''
        || registerPassword1 === ''
        || registerRealname === ''
        || registerEmail === ''
        || registerPassword2 === '') {
        document.getElementById('register-error-info-show-box').style.display = 'block';
        document.getElementById('register-error-info-text').innerHTML = 'Please enter all information';
    } else {
        if (registerPassword1 !== registerPassword2) {
            document.getElementById('register-error-info-show-box').style.display = 'block';
            document.getElementById('register-error-info-text').innerHTML = 'Passwords not match!';

        } else {
            console.log(registerUsername, registerPassword1)
            api.post('auth/signup', {
                body: JSON.stringify({
                    "username": registerUsername,
                    "password": registerPassword1,
                    "email": registerEmail,
                    "name": registerRealname
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(data => {
                    console.log('Register Response: ', data.token);
                })
                .catch(err => {
                    logError(err);
                })
        }
    }

}

document.getElementById('register-submit-button').addEventListener('click', registerSubmit);


// =========================================== New Blog ===============================================

function newPost() {
    document.getElementById('new-post-box').style.display = 'block';
    document.getElementById('user-profile-box').style.display = 'none';
    document.getElementById('feed-box').style.display = 'none';
    document.getElementById('update-profile-box').style.display = 'none';
    //the textarea and file should be clear when pressing new post
    document.getElementById('new-post-input-field').value = "";
    document.getElementById('file-upload-button').value = "";
}

document.getElementById('banner-new-post-button').addEventListener('click', newPost)

 // submit new post
function submitNewPost(){
    const text_of_new_post= document.getElementById('new-post-input-field').value;

    api.post('post/', {
        body: JSON.stringify({
            "description_text": text_of_new_post,
            "src": base_code
        }),
        headers: {
            Authorization: `Token ${theToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(data => {
            alert("Posts success");
            console.log(data);
        })
        .catch(error => {
            logError(error);
        })
}
document.getElementById('new-post-submit-button').addEventListener('click', submitNewPost);
    // upload file
document.getElementById('file-upload-button').addEventListener('change', readFile => {
    if (!this.files || !this.files[0]) {
        return ;
    }
    const fileReaderConsole = new FileReader();
    fileReaderConsole.addEventListener('load', fileReading => {
        const result = fileReading.target.result;
        base_code = result.replace(/data\:image\/.*\;base64\,/i, "");
        console.log(base_code);
    });
    fileReaderConsole.readAsDataURL(this.files[0]);
});


// =========================================== Main Page ===============================================

    // main page should show feed default

function BackToMainPage() {
    document.getElementById('user-profile-box').style.display = 'none';
    document.getElementById('new-post-box').style.display = 'none';
    document.getElementById('update-profile-box').style.display = 'none';
    document.getElementById('feed-box').style.display = 'block';
}
document.getElementById('banner-main-page-button').addEventListener('click', BackToMainPage)


// =========================================== Feed ===============================================

// get feed event
function getFeedOfUser (theToken)  {
    const page = 0;
    const number_of_page = 10;
    api.get(`user/feed?p=${page}&n=${number_of_page}`, {
            headers: {
                Authorization: `Token ${theToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(data => {
            // post length in  console

            console.log('get user feed:', data);
            const num_of_posts = data.posts.length;
            if (num_of_posts === 0) {
                document.getElementById('feed-box').innerHTML = 'No Posts Yet!';
            }else{
                // after logged in, feed should show the user's posts
                ShowPosts(data, 'feed');
            }


        })
        .catch(err => {
            alert(err);
        });
}


function inArrayCheck(array, v) {
    for (let i = 0; i < array.length; i++) {
        if (v === array[i]) {
            return true;
        }
    }
    return false;
}
function create(command){
    let obj = document.createElement(command);
    return obj;
}
    // posts show
const ShowPosts = (data, obj) => {
    // get the number of current user's posts
    const postLength = data.posts.length;
    // clear previous showing feeds
    let feed_box_obj = document.getElementById('feed-box');
    if (feed_box_obj.childNodes) {
        const obj = feed_box_obj.childNodes;
        for (let i = obj.length - 1; i >= 0; i--) {
            feed_box_obj.removeChild(obj[i]);
        }
    }

    for (let i = 0; i < postLength; i++) {
        const Post_Box_Api = create('div');
        Post_Box_Api.style.width = '80%';
        Post_Box_Api.style.height = 'auto';
        Post_Box_Api.style.margin = '10px';

        const inner_post_box = create('div');
        inner_post_box.style.display = 'flex';

        let post_box_2 = create('div');
        post_box_2.style.width = '480px';
        post_box_2.style.background = 'white'
        let Poster_who = create('div');
        Poster_who.innerText = data.posts[i].meta.author;
        Poster_who.style.margin = '15px';
        Poster_who.style.fontSize = '2em'
        const post_timestamp = create('div');
        const post_text = create('div');
        const post_pic_box = create('div');
        const post_pic = create('img');

        post_pic_box.appendChild(post_pic);
        post_box_2.appendChild(Poster_who);
        post_box_2.appendChild(post_timestamp);
        post_box_2.appendChild(post_text);
        post_box_2.appendChild(post_pic_box);

        const posts_alig = create('div');
        posts_alig.style.display = 'flex';
        posts_alig.style.background = 'white';
        posts_alig.style.height = '40px';
        const post_comments = create('div');
        post_comments.style.width = '50%px';

        const posts_like = create('div');
        posts_like.style.width = '50%';
        posts_like.style.cursor = 'pointer';
        post_comments.innerText = 'comments: ' + data.posts[i].comments.length;
        // check be liked
        if (inArrayCheck(data.posts[i].meta.likes, currentUserID)) {
            posts_like.innerText = 'liked :' + data.posts[i].meta.likes.length;
            posts_like.style.font = 'white';
            posts_like.style.background = 'orange';
        } else {
            posts_like.innerText = 'to like: ' + data.posts[i].meta.likes.length;
        }

        const list_of_posts_like = create('div');
        list_of_posts_like.style.width = '5%';
        list_of_posts_like.innerText = 'likes';

        posts_alig.appendChild(post_comments);
        posts_alig.appendChild(posts_like);
        posts_alig.appendChild(list_of_posts_like);

        const timestamp_in_UNIX = new Date(data.posts[i].meta.published * 1000);
        post_timestamp.innerText = timestamp_in_UNIX.toLocaleString();
        post_text.innerText = data.posts[i].meta.description_text;

        post_pic.src = imgDisplay(data.posts[i].src);
        post_pic.style.width = '20%';

        inner_post_box.appendChild(post_box_2);
        Post_Box_Api.appendChild(inner_post_box);
        Post_Box_Api.appendChild(posts_alig);
        document.getElementById(obj).appendChild(Post_Box_Api);

        // click to check profiles
        currentUsername = Poster_who.innerText;
        function checkProfileClick(currentUsername){
            document.getElementById('usersProfile').style.display = 'block';
            document.getElementById('feed-box').style.display = 'none';
            profileView(Poster_who);
        }
        Poster_who.addEventListener('click', checkProfileClick);

        // Click to like
        // TODO to be implemented

        // Click to comment
        // TODO to be implemented

        // Click to profile
        // TODO to be implemented

        var feedLikeListBox = create('div')
        feedLikeListBox.style.display = 'none';


        // likes list , token ,通过list的id找到user名

        Post_Box_Api.appendChild(feedLikeListBox);


        const commentList = data.posts[i].comments;
        console.log(commentList)
        const feedCommentBox = create('div');
        feedCommentBox.style.display = 'none';


        // comment function
        const feedCommentInputAuthorBox = create('div');
        const feedCommentInputAuthor = create('div');
        feedCommentInputAuthor.innerText = 'USERNAME';
        feedCommentInputAuthor.style.margin = '20px';
        feedCommentInputAuthorBox.appendChild(feedCommentInputAuthor);


        const feedCommentInputBox = create('div');
        const feedCommentInput = create('textarea');
        feedCommentInput.style.border = '2px solid black';

        feedCommentInputBox.appendChild(feedCommentInput);

        const feedCommentInputBtn = create('button');
        feedCommentInputBtn.innerText = 'comment';
        feedCommentInputBtn.style.position = 'relative';


        // feedCommentInputBtn.style.position='relative';

        const feedUserCommentBox = create('div');
        feedUserCommentBox.style.width = '50%px';
        feedUserCommentBox.style.display = 'flex';



        feedUserCommentBox.appendChild(feedCommentInputAuthorBox);
        feedUserCommentBox.appendChild(feedCommentInputBox);
        feedUserCommentBox.appendChild(feedCommentInputBtn);


        feedCommentBox.appendChild(feedUserCommentBox);
        Post_Box_Api.appendChild(feedCommentBox);


    }
}






// display img by encoding base64  fucntion
const imgDisplay = (data) => {
    return 'data:image/jpeg;base64,' + data;
}

document.getElementById('banner-profile-button').addEventListener('click', e => {
    document.getElementById('feed-box').style.display = 'none';
    document.getElementById('new-post-box').style.display = 'none';
    document.getElementById('user-profile-box').style.display = 'block';
    document.getElementById('update-profile-box').style.display = 'none';
    profileView('myself');
});



const profileView = (author) => {
    if (author === 'myself') {
        api.get('user/', {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                console.log(data);
                document.getElementById('user-profile-page-showing-realname').innerText = ` name: ${data.name}`;
                document.getElementById('user-profile-page-showing-email').innerText = ` email: ${data.email}`;
                document.getElementById('user-profile-page-showing-id').innerText = ` ID: ${data.id}`;

                document.getElementById('profile_following_content').innerText = ' Following: ' + data.following;
                document.getElementById('profile_followed_content').innerText = ' Followed: ' + data.followed_num;

                document.getElementById('profile_toFollow_button').style.display = 'none';
                document.getElementById('profile_toUnfollow_button').style.display = 'none';
                document.getElementById('profile_toUpdate_button').style.display = 'block';
                //get the post id ========  data.posts[]
                profilePosts(data, 'usersPosts');
            })
            .catch(err => {
                alert(err);
            });
    } else {
        api.get(`user/?username=${author.innerText}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                console.log(data);
                document.getElementById('profile_toFollow_button').style.display = 'block';
                document.getElementById('profile_toUnfollow_button').style.display = 'block';
                document.getElementById('profile_toUpdate_button').style.display = 'none';
                document.getElementById('user-profile-page-showing-realname').innerText = ` name: ${data.name}`;
                document.getElementById('user-profile-page-showing-email').innerText = ` email: ${data.email}`;
                document.getElementById('user-profile-page-showing-id').innerText = ` ID: ${data.id}`;

                document.getElementById('profile_following_content').innerText = ' Following: ' + data.following;
                document.getElementById('profile_followed_content').innerText = ' Followed: ' + data.followed_num;
                //get the post id ========  data.posts[]
                profilePosts(data, 'usersPosts');
            })
            .catch(err => {
                alert(err);
            });
    }

};



// a function to get posts using for loop
// data-> user info
const profilePosts = (data, userchosen) => {
    let frame_r_obj = document.getElementById('frame_right');
    if (frame_r_obj.childNodes) {
        const obj = frame_r_obj.childNodes;
        for (let i = obj.length - 1; i >= 0; i--) {
            frame_r_obj.removeChild(obj[i]);
        }
    }
    var post_array = data.posts;
    //get the post id
    for (let postID of post_array) {
        // for every postID, use 'GET' /post/
        api.get(`post/?id=${postID}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                displayProfilePosts(data);
            })
            .catch(err => {
                alert(err);
            });
    }

    let following_list_obj = document.getElementById('follow_ul')
    if (following_list_obj.childNodes) {
        const obj = following_list_obj.childNodes;
        for (let i = obj.length - 1; i >= 0; i--) {
            following_list_obj.removeChild(obj[i]);
        }
    }
    const follow_array = data.following;
    for (let followID of follow_array) {
        api.get(`user/?id=${followID}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                displayProfileFollow(data);
            })
    }

};



const displayProfileFollow = (data) => {
    var li = document.createElement('li');
    li.style.width = '100%';
    var follow_item = document.createElement('div');
    follow_item.style.display = 'flex';
    follow_item.style.width = '400px';
    follow_item.style.height = '100%';
    follow_item.style.alignItems = 'center';


    var follow_info = document.createElement('div');
    follow_info.style.width = '300px';


    var name = document.createElement('div');
    name.innerText = data.name;
    name.style.fontSize = 'xx-large';
    name.style.fontFamily = 'fantasy';
    name.style.marginTop = '10pt';

    var id = document.createElement('div');
    id.innerText = data.id;
    var email = document.createElement('div');
    email.innerText = data.email;


    follow_info.appendChild(name);
    follow_info.appendChild(id);
    follow_info.appendChild(email);


    const _btn = document.createElement('div');
    _btn.style.width = '100px';
    const button_toFollow = document.createElement('button');
    button_toFollow.innerText = 'follow';
    const button_toUnfollow = document.createElement('button');
    button_toUnfollow.innerText = 'unfollow';

    _btn.appendChild(button_toFollow);
    _btn.appendChild(button_toUnfollow);
    follow_item.appendChild(follow_info);
    follow_item.appendChild(_btn);
    li.appendChild(follow_item);
    document.getElementById("follow_ul").appendChild(li);

    button_toFollow.addEventListener('click', e => {
        api.put(`user/follow?username=${name.innerText}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            }).then(data => {
                alert('success follow!');
            })
            .catch(err => {
                alert(err);
            });
    })

    button_toUnfollow.addEventListener('click', e => {
        api.put(`user/unfollow?username=${name.innerText}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            }).then(data => {
                alert('success unfollow!');
            })
            .catch(err => {
                alert(err);
            });
    })

}


const displayProfilePosts = (data) => {
    console.log(data.id)
    const posts_profile_box = create('div');
    posts_profile_box.style.width = "95%";
    posts_profile_box.style.margin = '10px'
    posts_profile_box.style.display = "flex";

    const profile_posts_container = create('div');
    profile_posts_container.style.display = 'flex';
    profile_posts_container.style.height = 'auto';


    const profile_posts_content_container = create('div');
    profile_posts_content_container.style.width = '80%';

    const self_poster = create('div');
    self_poster.innerText = data.meta.author;
    self_poster.style.margin = '20px';
    self_poster.style.fontSize = '2em';

    const self_postsTime = create('div');
    const self_postsText = create('div');
    const self_postsImgBox = create('div');
    const self_postsImg = create('img');

    const self_posts_FLEXER = create('div');
    self_posts_FLEXER.style.background = 'white';
    self_posts_FLEXER.style.display = 'flex';
    self_posts_FLEXER.style.height = '40px';

    const self_post_comments_box = create('div');
    self_post_comments_box.style.width = '30%';


    const self_postsLike = create('div');
    self_postsLike.style.width = '30%';


    const self_post_edit_box = create('div');
    self_post_edit_box.style.width = '30%';
    self_post_edit_box.innerText = 'Edit';
    self_post_edit_box.style.cursor = 'pointer';

    const self_post_like_box = create('div');
    self_post_like_box.style.width = '30%';
    self_post_like_box.innerText = 'liked';
    self_post_like_box.style.textAlign = 'center';



    self_post_comments_box.innerText = 'comment: ' + data.comments.length /////////
    if (inArrayCheck(data.meta.likes, currentUserID)) {
        self_postsLike.innerText = 'liked: ' + data.meta.likes.length;
        self_postsLike.style.font = 'white';
        self_postsLike.style.background = 'orange';
    } else {
        self_postsLike.innerText = 'to like: ' + data.meta.likes.length;
    }


    self_postsImgBox.appendChild(self_postsImg);
    profile_posts_content_container.appendChild(self_poster);
    profile_posts_content_container.appendChild(self_postsTime);
    profile_posts_content_container.appendChild(self_postsText);
    profile_posts_content_container.appendChild(self_postsImgBox);

    self_posts_FLEXER.appendChild(self_post_comments_box);
    self_posts_FLEXER.appendChild(self_postsLike);
    self_posts_FLEXER.appendChild(self_post_like_box);
    self_posts_FLEXER.appendChild(self_post_edit_box);

    var unixTimestamp = new Date(data.meta.published * 1000);
    self_postsTime.innerText = unixTimestamp.toLocaleString();
    self_postsTime.innerText = data.meta.description_text;

    self_postsImg.src = imgDisplay(data.src);
    self_postsImg.style.width = '374px';


    profile_posts_container.appendChild(profile_posts_content_container);
    posts_profile_box.appendChild(profile_posts_container);
    posts_profile_box.appendChild(self_posts_FLEXER);
    document.getElementById('frame_right').appendChild(posts_profile_box);


    const edit_posts_box = create('div');
    const edit_posts_input_field = create('textarea');
    edit_posts_input_field.style.width = '89%';
    edit_posts_input_field.style.height = '200px';

    const edit_post_console_box = create('div');
    edit_post_console_box.style.width = '19%';
    const edit_req_button = create('button');
    edit_req_button.style.width = '8%';
    edit_req_button.innerText = 'Edit Post';
    const post_del_button = create('button');
    post_del_button.style.width = '10%px';
    post_del_button.innerText = ' Delete ';
    edit_post_console_box.appendChild(edit_req_button);
    edit_post_console_box.appendChild(post_del_button);
    edit_posts_box.appendChild(edit_posts_input_field);
    edit_posts_box.appendChild(edit_post_console_box);
    edit_posts_box.style.display = 'flex';


    const post_edit_container = create('div');
    post_edit_container.appendChild(edit_posts_box);
    post_edit_container.style.display = 'none';
    posts_profile_box.appendChild(post_edit_container);
    edit_req_button.addEventListener('click', editpress => {
        api.put(`post/?id=${data.id}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "description_text": edit_posts_input_field.value,
                    "src": data.src
                })

            })
            .then(data => {
                alert(data.message);
            })
            .catch(err => {
                alert(err);
            });
    })

    post_del_button.addEventListener('click', e => {
        api.delete(`post/?id=${data.id}`, {
                headers: {
                    Authorization: `Token ${theToken}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(data => {
                alert(data.message);
            })
            .catch(err => {
                alert(err);
            });
    })

    clickEditPostEvent(self_post_edit_box, post_edit_container)

}

// edit signal
let signal_edit = 'true';
const clickEditPostEvent = (inner_self_edit_box, bog_box_edit_post) => {
    inner_self_edit_box.addEventListener('click', e => {
        if (signal_edit === 'true') {
            bog_box_edit_post.style.display = 'block';
            signal_edit = 'false';
        } else {
            bog_box_edit_post.style.display = 'none';
            signal_edit = 'true';
        }
    })
}




// if click the main page, if logged in , not show login and transfer to main page
//  if not logged in , only show login and register in the banner
document.getElementById('banner-main-page-button').addEventListener('click', e => {
    // document.getElementById('otherUsersProfile').style.display = 'none';
    document.getElementById('myselfUsersProfile').style.display = 'none';
    document.getElementById('new-post-box').style.display = 'none';
    document.getElementById('feed-box').style.display = 'block';
    document.getElementById('update-profile-box').style.display = 'none';
});

//----------------------------------------------------------------------------------


document.getElementById('profile_toFollow_button').addEventListener('click', e => {
    api.put(`user/follow?username=${currentUsername}`, {
            headers: {
                Authorization: `Token ${theToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(data => {
            console.log('success follow!');
        })
        .catch(err => {
            alert(err);
        });
});

document.getElementById('profile_toUnfollow_button').addEventListener('click', e => {
    api.put(`user/unfollow?username=${currentUsername}`, {
            headers: {
                Authorization: `Token ${theToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(data => {
            console.log('success unfollow!');
        })
        .catch(err => {
            alert(err);
        });
});
//when click the update profile button on the banner, should lead to a profile edit box
document.getElementById('banner-update-profile-button').addEventListener('click', e => {
    document.getElementById('update-profile-box').style.display = 'block';
    document.getElementById('user-profile-box').style.display = 'none';
    document.getElementById('feed-box').style.display = 'none';
})
// when clicking the submit button, will send a PUT request to SAP_backend with the updating information
document.getElementById('update-profile-submit-button').addEventListener('click', e => {
    const newEmail = document.getElementById('update-email').value;
    const newpPassword = document.getElementById('update-password').value;
    const newName = document.getElementById('update-real-name').value;

    api.put('user/', {
            headers: {
                Authorization: `Token ${theToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": newEmail,
                "name": newpPassword,
                "password": newName
            })
        })
        .then(data => {
            alert('Updating success!');
            console.log(data);
        })
        .catch(err => {
            alert(err);
        });
})

function banner_follow_click() {
    const name = document.getElementById('banner-follow-input-field').value;
    api.put(`user/follow?username=${name}`, {
        headers: {
            Authorization: `Token ${theToken}`,
            'Content-Type': 'application/json'
        },
    })
        .then(data => {
            alert(`successfully followed!${data.name}`);
        })
        .catch(error => {
            alert(error);
        });
}


document.getElementById('banner-follow-button').addEventListener('click', banner_follow_click)

function refreshEvent(){
    getFeedOfUser(theToken);
    profileView('myself');
//    clear all tables
    clearInputFields();

}

document.getElementById('banner-refresh-button').addEventListener('click', refreshEvent);


//----------------------------------------------------------------------------------