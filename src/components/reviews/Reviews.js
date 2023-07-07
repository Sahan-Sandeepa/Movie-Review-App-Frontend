import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    let i = 0;
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    function addReview(e) {
        e.preventDefault();

        const rev = revText.current;

        const reviewData = {
            reviewBody: rev.value,
            imdbId: movieId
        };

        axios
            .post("http://localhost:8080/api/v1/reviews", reviewData)
            .then(response => {
                const updatedReviews = [...reviews, { body: rev.value }];
                rev.value = "";
                setReviews(updatedReviews);
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (!Array.isArray(reviews)) {
        reviews = []; // Initialize reviews as an empty array if it's not already an array
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
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {reviews.map(r => (
                        <div key={i = i + 1}>
                            <Row>
                                <Col>{r.body}</Col>
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


export default Reviews