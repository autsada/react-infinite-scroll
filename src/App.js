import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@material-ui/core"
import styled from "styled-components"

import { api } from "./api"

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 60%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: white;
  }
`

const Posts = () => {
  const [allPosts, setAllPosts] = useState(null)
  const [displayedPosts, setDisplayedPosts] = useState(null)
  const [observedEl, setObservedEl] = useState(null)

  const loadMore = posts => {
    setTimeout(() => {
      setDisplayedPosts([
        ...displayedPosts,
        ...posts.slice(
          displayedPosts.length,
          posts.length > displayedPosts.length + 10
            ? displayedPosts.length + 10
            : posts.length
        )
      ])
    }, 500)
  }

  const observer = new IntersectionObserver(
    items => {
      if (items[0].isIntersecting) {
        // if more data, load more
        loadMore(allPosts)
      }
    },
    { threshold: 1 }
  )

  // CallData from Backend
  useEffect(() => {
    const getData = async () => {
      const posts = await api()
      setAllPosts(posts)
    }
    getData()
  }, [])

  // Set first display depending on the posts (allPosts) the received from backend
  useEffect(() => {
    if (allPosts) setDisplayedPosts(allPosts.slice(0, 10))
  }, [allPosts])

  useEffect(() => {
    if (observedEl) {
      observer.observe(observedEl)
    }

    return () => {
      if (observedEl) {
        observer.unobserve(observedEl)
      }
    }
  }, [observedEl, observer])

  return (
    <>
      {!displayedPosts ? (
        <p>Loading...</p>
      ) : (
        displayedPosts.map(post => (
          <div key={post}>
            <Card style={{ background: "brown" }}>
              <CardContent>{post}</CardContent>
            </Card>
          </div>
        ))
      )}

      {(allPosts && allPosts.length) >
        (displayedPosts && displayedPosts.length) && (
        <p ref={setObservedEl}>Load more...</p>
      )}
    </>
  )
}

function App() {
  return (
    <Div>
      <Posts />
    </Div>
  )
}

export default App
