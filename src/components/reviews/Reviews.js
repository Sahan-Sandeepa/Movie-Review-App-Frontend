import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
    const [review, setReview] = useState([]);
    const [getreview, setGetReview] = useState([]);
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const getSingleMovieData = () => {
        axios
            .get(`http://localhost:8080/api/v1/reviews/movies/${movieId}`)
            .then((res) => {
                setGetReview(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getSingleMovieData();
        const interval = setInterval(getSingleMovieData, 1000); // Fetch data every 5 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [movieId]);

    const addReview = (e) => {
        e.preventDefault();

        const rev = revText.current;

        const reviewData = {
            reviewBody: rev.value,
            imdbId: movieId,
        };

        axios
            .post("http://localhost:8080/api/v1/reviews", reviewData)
            .then((response) => {
                const updatedReviews = [...(reviews || []), { body: rev.value }];
                rev.value = "";
                setReviews(updatedReviews);
                setReview(updatedReviews);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const deleteReview = (id) => {
        axios
            .delete("http://localhost:8080/api/v1/reviews/" + id)
            .then(() => {
                alert("Document Deleted Successfully!");
            })
            .catch(() => {
                alert("Error Occurred On Delete");
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} lableText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {getreview?.map((r, index) => (
                        <div key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                                <Button>Edit</Button>
                                <Button onClick={() =>
                                    deleteReview(r.id)
                                }>Delete</Button>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};


export default Reviews;