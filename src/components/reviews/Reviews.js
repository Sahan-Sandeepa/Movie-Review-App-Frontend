import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from 'react';
const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
    const [getreview, setGetReview] = useState([]);
    // const revText = useRef();
    const [editingReview, setEditingReview] = useState(null); // Track the review being edited
    let params = useParams();
    const movieId = params.movieId;
    const [rev, setRev] = useState("");

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const loadReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reviews/movies/${movieId}`);
            setGetReview(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadReviews();
        const interval = setInterval(loadReviews, 1000);
        return () => clearInterval(interval);
    }, [movieId]);


    const addReview = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/v1/reviews", {
                reviewBody: rev,
                imdbId: movieId,
            });
            setRev("");
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };

    const editReview = (review) => {
        setEditingReview(review);
        setRev(review.body);
    };

    const updateReview = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/v1/reviews/${editingReview.id}`, {
                reviewBody: rev,
            });
            setEditingReview(null);
            setRev("");
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };


    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/reviews/${id}`);
            loadReviews();
        } catch (error) {
            console.error(error);
        }
    };


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
                    <Container className="mb-3">
                        <h1 className="text-left text-white mb-3">Review</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="reviewBody">
                                <FormControl
                                    type="text"
                                    as="textarea"
                                    value={rev}
                                    rows={3}
                                    onChange={(event) => setRev(event.target.value)}
                                />
                            </Form.Group>

                            <div className="text-center">
                                {editingReview ? (
                                    <Button className="me-2" variant='warning' onClick={updateReview}>
                                        Update
                                    </Button>
                                ) : (
                                        <Button className="me-2" variant='outline-info' onClick={addReview}>
                                        Submit
                                    </Button>
                                )}
                                <Button variant="outline-danger" onClick={() => setEditingReview(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Container>
                    <br />
                    {getreview?.map((review, index) => (
                        <div key={index}>
                            <Row className="align-items-center">
                                <Col>{review.body}</Col>
                                <Col className="text-end">
                                    <Button
                                        className="me-2"
                                        variant="outline-warning"
                                        onClick={() => editReview(review)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteReview(review.id)}
                                    >
                                        Delete
                                    </Button>
                                </Col>
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