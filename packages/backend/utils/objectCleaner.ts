export const objectCleaner = (
  body: {
    [key: string]: any;
  },
  possible: string[]
) => {
  const updateData: {
    [key: string]: any;
  } = {};

  Object.keys(body).forEach((key) => {
    if (possible.includes(key)) {
      if (body[key] !== undefined && body[key] !== null) {
        updateData[key] = body[key];
      }
    }
  });

  return updateData;
};
