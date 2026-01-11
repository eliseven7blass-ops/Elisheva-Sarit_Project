import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUserId } from "../api/PostsAPI";
import { filterByIdTitle } from "../../utils/filterByIdTitle";
import "./Posts.css";

import PostsFilters from "./PostsFilters";
import PostsList from "./PostsList";
import PostDetails from "./PostDetails";

import { createPost, deletePost, updatePost } from "../api/PostsAPI";
import AddPostForm from "./AddPostForm";
import EditPostForm from "./EditPostForm";


function Posts() {
    const { userId } = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchId, setSearchId] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showComments, setShowComments] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const detailsRef = useRef(null);
    const commentsRef = useRef(null);

    // גלילה אוטומטית
    useEffect(() => {
        if (!selectedPostId) return;

        detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [selectedPostId]);

    useEffect(() => {
        if (!showComments || !selectedPostId) return;

        commentsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [showComments, selectedPostId]);



    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError("");

                const data = await getPostsByUserId(userId);
                setPosts(data);
            } catch (e) {
                setError("שגיאה בטעינת פוסטים");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [userId]);

    const filteredPosts = useMemo(() => {
        return filterByIdTitle(posts, searchId, searchTitle);
    }, [posts, searchId, searchTitle]);

    const selectedPost = posts.find((p) => String(p.id) === String(selectedPostId));

    function handleSelectPost(postId) {
        setSelectedPostId(postId);
        setShowComments(false);
        setIsEditing(false);
    }

    function toggleComments() {
        setShowComments((prev) => !prev);
    }


    async function handleAddPost({ title, body }) {

        try {
            const newPost = await createPost(userId, title, body);

            // נוסף לראש הרשימה 
            setPosts((prev) => [newPost, ...prev]);
        } catch (e) {
            console.error(e);
            alert("לא הצלחתי להוסיף פוסט");
        }

    }

    async function handleSaveEdit({ title, body }) {
        try {
            if (!selectedPost) {
                alert("לא נבחר פוסט");
                return;
            }

            const updated = await updatePost(selectedPost.id, { title, body });

            setPosts((prev) =>
                prev.map((p) => (String(p.id) === String(updated.id) ? updated : p))
            );

            setIsEditing(false);
        } catch (e) {
            console.error(e);
            alert("לא הצלחתי לעדכן פוסט");
        }
    }


    async function handleDeletePost(postId) {
        const ok = confirm("בטוח למחוק את הפוסט?");
        if (!ok) return;

        try {
            await deletePost(postId);

            setPosts((prev) => prev.filter((p) => String(p.id) !== String(postId)));

            if (String(selectedPostId) === String(postId)) {
                setSelectedPostId(null);
                setShowComments(false);
            }
        } catch (e) {
            console.error(e);
            alert("לא הצלחתי למחוק פוסט");
        }
    }


    if (loading) return <p className="posts-status">טוען פוסטים...</p>;
    if (error) return <p className="posts-error">{error}</p>;

    return (
        <div className="posts-container">
            <h2>Posts</h2>

            <AddPostForm onAdd={handleAddPost} />

            <PostsFilters
                searchId={searchId}
                setSearchId={setSearchId}
                searchTitle={searchTitle}
                setSearchTitle={setSearchTitle}
            />

            <PostsList
                posts={filteredPosts}
                selectedPostId={selectedPostId}
                onSelect={handleSelectPost}
                onDelete={handleDeletePost}
            />

            <PostDetails
                selectedPost={selectedPost}
                detailsRef={detailsRef}
                commentsRef={commentsRef}
                showComments={showComments}
                toggleComments={toggleComments}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onDelete={handleDeletePost}
                onSave={handleSaveEdit}
            />


        </div>
    );
}

export default Posts;