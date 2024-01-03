import { createContext, useContext, useState } from 'react';
const ForumContext = createContext({});

const ForumContextProvider = ({ children }) => {
    const [posts, setposts] = useState([]);
    const [postData, setPostData] = useState({
        title: '',
        info: '',
        field: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addCommentToPostArray = async (postId, commentId) => {
        //adding comment to post array
        const data = {
            _id: commentId,
        }
        //add comment to db
        const response = await fetch('http://localhost:3000/forums/posts/comments/' + postId, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

    }
    const addComment = async (parentId, content) => {
        //add comment to db (comments collection)
        const data = {
            content: content
        }
        const response = await fetch('http://localhost:3000/forums/comments', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        const comment = await response.json();
        return comment;

    }
    const addCommentToPost = async (parentId, content) => {
        const comment = await addComment(parentId, content);
        //   console.log({comment});
        addCommentToPostArray(parentId, comment._id);
        return comment;

    }
    const getCommentsOfPost = async (postId) => {
        const data = await fetch('http://localhost:3000/forums/posts/comments/' + postId)
        const res = await data.json();
        // console.log({res});
        const commentIds = res.myComments.filter(commentId => commentId !== null);
        const postComments = commentIds.map(async (comment) => {
            const temp = await fetch('http://localhost:3000/forums/comments/' + comment);
            return temp.json();
        })
        const comments = Promise.all(postComments);
        // console.log({comments});
        return comments;
        // console.log(res);
    }
    const getCommentsOfComment = async (commentId) => {
        const data = await fetch('http://localhost:3000/forums//comments/' + commentId)
        const res = await data.json();
        // console.log({res});
        const commentIds = res.myComments?.filter(commentId => commentId !== null);
        const commentComments = commentIds.map(async (comment) => {
            const temp = await fetch('http://localhost:3000/forums/comments/' + comment);
            return temp.json();
        })
        const comments = Promise.all(commentComments);
        console.log({ comments });
        return comments;
        // console.log(res);
    }

    const addCommentToComment = async (commentId, content) => {
        const comment = await addComment(commentId, content);
        // console.log({comment});
        addCommentToCommentArray(commentId, comment._id);
        return comment;
    }

    const addCommentToCommentArray = async (commentId, newcommentId) => {
        //adding comment to comment array
        // console.log({commentId,newcommentId});
        const data = {
            _id: newcommentId,
        }
        const response = await fetch('http://localhost:3000/forums/comments/comments/' + commentId, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        // const temp=await response.json();
        // console.log({temp});

    }
    const addPost = async (courseId) => {
        const dataToSend = {
            ...postData,
            dateCreated: Date.now(),
            courseId: courseId // Assuming courseId is passed as a prop to the component
        };
        const response = await fetch('http://localhost:3000/forums/posts', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-type': 'application/json',
                "authorization": localStorage.getItem("token")
            }
        });
        const data = await response.json();

        if (data) {
            console.log(data.msg);
            setposts([...posts, data.newPost])
            //update the posts
        }
    }
    const shared = { posts, setposts, addComment, setPostData, handleChange, postData, getCommentsOfPost, addCommentToPost, addPost, addCommentToComment, getCommentsOfComment }
    return (
        <ForumContext.Provider value={shared}>
            {children}
        </ForumContext.Provider>
    );
}

export { ForumContextProvider }
export default ForumContext

