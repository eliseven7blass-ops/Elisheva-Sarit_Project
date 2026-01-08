import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByUserId } from "../api/PostsAPI";
import "./Posts.css";
import { filterByIdTitle } from "../../utils/filterByIdTitle";



function Posts() {
    const { userId } = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchId, setSearchId] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [selectedPostId, setSelectedPostId] = useState(null);

    const detailsRef = useRef(null);

    useEffect(() => {      // גלילה אוטומטית 
        if (!selectedPostId) return;

        detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [selectedPostId]);


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


    if (loading) return <p className="posts-status">טוען פוסטים...</p>;
    if (error) return <p className="posts-error">{error}</p>;

    return (
        <div className="posts-container">
            <h2>Posts</h2>

            <div className="posts-filters">
                <input
                    type="text"
                    placeholder="חיפוש לפי id"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="חיפוש לפי כותרת"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <p className="posts-status">לא נמצאו פוסטים.</p>
            ) : (
                <ul className="posts-list">
                    {filteredPosts.map((post) => {
                        const isSelected = String(post.id) === String(selectedPostId);

                        return (
                            <li
                                key={post.id}
                                className={`posts-item ${isSelected ? "selected" : ""}`}
                            >
                                <div className="posts-left">
                                    <span className="posts-id">#{post.id}</span>
                                    <span className="posts-title">{post.title}</span>
                                </div>

                                <button
                                    className="posts-select-btn"
                                    onClick={() => setSelectedPostId(post.id)}
                                >
                                    {isSelected ? "נבחר" : "בחר"}
                                </button>
                            </li>
                        );
                    })}
                </ul>

            )}

            <div ref={detailsRef} className="post-details">
                {!selectedPost ? (
                    <p className="posts-status">בחר פוסט כדי לראות את התוכן שלו.</p>
                ) : (
                    <>
                        <h3>פוסט נבחר: #{selectedPost.id}</h3>
                        <p className="post-details-title">{selectedPost.title}</p>
                        <p className="post-details-body">{selectedPost.body}</p>
                    </>
                )}
            </div>

        </div>

    );
}

export default Posts;
