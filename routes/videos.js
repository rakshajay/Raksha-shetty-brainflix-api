import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/videos", (req, res) => {
    try {
        const videos = JSON.parse(fs.readFileSync("./data/video.json"));

        const sideBarVideoData = videos.map((video) => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        }));

        res.send(sideBarVideoData);  
    } catch (error) {
        console.error("Error reading or parsing video data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/videos/:id", (req, res) => {
    try {
        const videos = JSON.parse(fs.readFileSync("./data/video.json"));

        const foundVideo = videos.find((video) => video.id === req.params.id);

        if (foundVideo) {
            res.send(foundVideo);  
        } else {
            res.status(404).send({ message: "Video not found" });
        }
    } catch (error) {
        console.error("Error reading or parsing video data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/videos/:id/comments", (req, res) => {
    try {
        const videos = JSON.parse(fs.readFileSync("./data/video.json"));

        const foundVideo = videos.find((video) => video.id === req.params.id);

        if (foundVideo) {
            res.send(foundVideo.comments);
        } else {
            res.status(404).send({ message: "Video not found" });
        }
    } catch (error) {
        console.error("Error reading or parsing video data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


router.post("/videos", (req, res) => {
    try {
    const videoData = JSON.parse(
        fs.readFileSync("./data/video.json", "utf8")
    );

    console.log(req.body);

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Aiden Thompson",
        image: "default.jpeg",
        description: req.body.description,
        views: "125,6723",
        likes: "45,678",
        duration: "2:04",
        video: "default.mp4",
        timestamp:Date.now(),
        comments: [],
    };

    videoData.push(newVideo);

    fs.writeFileSync("./data/video.json", JSON.stringify(videoData));

    res.status(201).send(newVideo);
}catch (error) {
    console.error("Error updating video comments:", error);
    res.status(500).send({ message: "Internal Server Error" });
}
});


router.post("/videos/:id/comments", (req, res) => {
    try {
        const videos = JSON.parse(fs.readFileSync("./data/video.json", "utf8"));

        const video = videos.find((video) => video.id === req.params.id);

        if (!video) {
            return res.status(404).send({ message: "Video not found" });
        }

        const newComment = {
            id: uuidv4(),  
            name: req.body.name,
            comment: req.body.comment,
            timestamp: Date.now(),  
        };

        video.comments.push(newComment);

        fs.writeFileSync("./data/video.json", JSON.stringify(videos));

        res.status(201).send(newComment);
    } catch (error) {
        console.error("Error updating video comments:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// router.get("/videos/:videoId/comments/:commentId", (req, res) => {
//     try {
//         const videos = JSON.parse(fs.readFileSync("./data/video.json"));

//         const foundVideo = videos.find((video) => video.id === req.params.id);

//         if (foundVideo) {
//             res.send(foundVideo.comments);
//         } else {
//             res.status(404).send({ message: "Video not found" });
//         }
//     } catch (error) {
//         console.error("Error reading or parsing video data:", error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });


// Uncomment and update the following routes if needed

// router.get("/movies", (req, res) => {
//     const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
//     res.send(movies);
// });

// router.get("/movies/:id", (req, res) => {
//     const movies = JSON.parse(fs.readFileSync("./data/movies.json"));
//     const foundMovie = movies.find((movie) => movie.id === req.params.id);
//     res.send(foundMovie);
// });

// router.post("/movies", (req, res) => {
//     const moviesData = JSON.parse(fs.readFileSync("./data/movies.json", "utf8"));
//     const newMovie = {
//         id: uuidv4(),
//         title: req.body.title,
//         genre: req.body.genre,
//         image: "default.jpeg",
//         reviews: [],
//     };

//     moviesData.push(newMovie);
//     fs.writeFileSync("./data/movies.json", JSON.stringify(moviesData));
//     res.send(newMovie);
// });

export default router;
