const LikesService = {
  getLocalLikes(): number[] {
    const likes = localStorage.getItem("likes");

    return likes ? JSON.parse(likes) : [];
  },
  addLocalLike(likeId: number) {
    const likes = this.getLocalLikes();

    if (likes) {
      likes.push(likeId);
      localStorage.setItem("likes", JSON.stringify(Array.from(new Set(likes))));
      return;
    }
    localStorage.setItem("likes", JSON.stringify([likeId]));
  },

  removeLocalLike(likeId: number) {
    const likes = this.getLocalLikes();

    if (likes) {
      const newArr = likes.filter((like) => like !== likeId);
      localStorage.setItem(
        "likes",
        JSON.stringify(Array.from(new Set(newArr)))
      );
      return;
    }
  },
  isLiked(likeId: number) {
    const likes = this.getLocalLikes();

    if (likes) {
      return likes.find((element) => element === likeId) ? true : false;
    }
    return false;
  },
};

export default LikesService;
