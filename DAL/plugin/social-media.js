/**
 * Created with JetBrains PhpStorm.
 * User: claudio
 * Date: 12/2/12
 * Time: 10:01 AM
 * To change this template use File | Settings | File Templates.
 */

!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src="https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");

window.fbAsyncInit = function() {
    FB.init({
        appId      : '395297137214916', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // connected
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();
        } else {
            // not_logged_in
            login();
        }
    });
};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
        } else {
            // cancelled
        }
    });
}

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "https://connect.facebook.net/es_ES/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));