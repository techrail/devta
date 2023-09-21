export const setTextInputSize = async (ids) => {
  try {
    // gets the id's and sets the height of each component
    const promises = ids.map((id) => {
      const input = document.getElementById(id);
      input.style.height = "auto";
      input.style.height = input.scrollHeight + 10 + "px";
    });

    // concurrently resolves all the promises
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};
