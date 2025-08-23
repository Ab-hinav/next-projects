const paths = {

    home(){
        return '/'
    },
    postCreate(topicSlug:string){
        return `/topics/${topicSlug}/posts/new`
    },
    topicShow(topicSlug:string){
        return `/topics/${topicSlug}`
    },
    postShow(topicSlug:string,postId:string){
        return `/topics/${topicSlug}/posts/${postId}`
    }

}


export default paths