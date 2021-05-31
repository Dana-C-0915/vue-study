export default{
    props:{
        to:String,
        require:true
    },
    render(h) {
            return h('a',{
                attrs:{
                    href:'#'+this.to
                }
            },[
                this.$slots.default
            ])
    }
};