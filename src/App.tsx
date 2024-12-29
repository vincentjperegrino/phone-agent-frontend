import { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

const App = () => {
  const [isCalling, setIsCalling] = useState(false);

  const agentId = "YOUR AGENT ID";
  const apiKey = "YOUR RETELL API KEY";

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("Call started");
    });

    retellWebClient.on("call_ended", () => {
      console.log("Call ended");
      setIsCalling(false);
    });

    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
    } else {
      const webCallResponse = await createWebCall(agentId);
      if (webCallResponse?.access_token) {
        retellWebClient
          .startCall({
            accessToken: webCallResponse.access_token,
          })
          .catch(console.error);
        setIsCalling(true);
      }
    }
  };

  async function createWebCall(agentId: string) {
    try {
      const Retell = (await import("retell-sdk")).default;

      const client = new Retell({
        apiKey: apiKey,
      });

      const response = await client.call.createWebCall({
        agent_id: agentId,
      });

      console.log("Web call created:", response);

      return {
        access_token: response.access_token, // Replace with correct property from response
      };
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error creating web call:", err.message);
        throw new Error(err.message);
      } else {
        console.error("An unknown error occurred while creating web call");
        throw new Error("An unknown error occurred");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-950 to-purple-950">
      <header className="App-header">
        <button
          onClick={toggleConversation}
          className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-xl font-semibold transition transform hover:scale-110 hover:bg-blue-800 active:scale-95 active:bg-blue-700"
        >
          {isCalling ? "Stop Call" : "Start Call"}
        </button>
      </header>
    </div>
  );
};

export default App;