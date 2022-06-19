import React, { useState, useEffect } from "react";
import Axios from "axios";

function Posts() {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllActivities").then((response) => {
      setAllActivities(response.data);
    });
  }, []);
  //console.log(allActivities);
  return (
    <React.Fragment>
      {allActivities
        .slice(-3)
        .reverse()
        .map((post) => {
          return (
            <div className="posts-member" id={post.id}>
              <div className="member-info">
                <div className="member-img"></div>
                <p className="member-name">{post.users_id}</p>
                <div className="post-date">
                  <p className="">{post.created_at.substr(0, 10)}</p>
                </div>
              </div>
              <div className="post-body">
                <p className="post-txt">{post.activity}</p>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
}

export default Posts;
