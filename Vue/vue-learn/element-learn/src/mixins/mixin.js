const mixin = {
  filters: {
    grep: function(val){
      var date = new Date(val);
      var month = date.getMonth()+1
      return date.getFullYear()+'-'+(month > 9 ? month : '0'+month) +'-'+date.getDate()
    }
  }
}

export default mixin
