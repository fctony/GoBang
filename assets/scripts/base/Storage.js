var storageManager = (function(){
    return {
        getData:function(key){
            let a = cc.sys.localStorage.getItem(key);
            if(!a){
                return a;
            }
            else{
                return JSON.parse(cc.sys.localStorage.getItem(key));
            }
        },
        setData:function(key,data){
            cc.sys.localStorage.setItem(key,JSON.stringify(data))
        }
    };
    
})();

module.exports = storageManager;