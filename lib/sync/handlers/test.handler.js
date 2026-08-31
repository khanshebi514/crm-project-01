export async function testSyncHandler(operation) {
  console.log("SERVER TEST SYNC HANDLER", operation);

  return {
    message: "Server sync successful",

    entity: operation.entity,
  };
}
