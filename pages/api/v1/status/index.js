function status(resquest, response) {
  response.status(200).json({ status: "OK" });
}

export default status;
