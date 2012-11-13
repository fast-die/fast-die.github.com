if (!window.ODKL) { ODKL = {};}

if (!ODKL.P) {
    ODKL.P = {
        w : 565,
        h : 350,
        l : (screen.width/2)-(this.w/2),
        t : (screen.height/2)-(this.h/2),
        share_host : 'www.odnoklassniki.ru'
    };
}

if (!ODKL.Share) {
    ODKL.Share = function(el){
        if (el.tagName.toLowerCase() != "a") {return ;}     
        var url = 'http://'+ODKL.P.share_host+'/dk?st.cmd=addShare&st._surl='+encodeURIComponent(el.href);
        var w=window.open('','odkl_share', 'top='+ODKL.P.t+',left='+ODKL.P.l+',width='+ODKL.P.w+',height='+ODKL.P.h+',resizable=yes');
        w.document.write('loading ...');
        w.location.href=url;
    } 
}
