import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ProjectCards(props) {
  const navigate = useNavigate();

  const handleBlogClick = () => {
    if (props.blogId) {
      navigate(`/blog/${props.blogId}`);
    }
  };

  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {props.isBlog ? (
          <Button variant="primary" onClick={handleBlogClick}>
            📖 &nbsp;Read Blog
          </Button>
        ) : (
          <>
            {props.ghLink && (
              <Button variant="primary" href={props.ghLink} target="_blank">
                <BsGithub /> &nbsp;GitHub
              </Button>
            )}
            {props.demoLink && (
              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                style={{ marginLeft: "10px" }}
              >
                <CgWebsite /> &nbsp;Demo
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
