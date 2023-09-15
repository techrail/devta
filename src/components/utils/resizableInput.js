export const setTextInputSize = async (ids) => {
  try {
    const promises = ids.map((id) => {
      const input = document.getElementById(id);
      input.style.height = "auto";
      input.style.height = input.scrollHeight + 10 + "px";
    });
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};
