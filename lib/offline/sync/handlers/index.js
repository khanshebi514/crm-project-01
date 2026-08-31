export const syncHandlers = {
  TEST_ENTITY: async (operation) => {
    console.log("TEST HANDLER EXECUTED", operation);

    return {
      success: true,
    };
  },
};
