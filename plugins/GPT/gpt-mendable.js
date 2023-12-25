import { fetch } from "undici";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let theme = {
        autogpt: 'a0bd44db-eb3b-412f-8924-b31c58244a64',
        langflow: 'b7f52734-297c-41dc-8737-edbd13196394',
    };

    let text;

    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw "Input Teks";
    }

    await m.reply(wait);

    try {
        const chatType = text.split('|')[0];

        if (chatType === '1' || chatType === '2') {
            const output = await createChat(text, (chatType === '1' ? theme.autogpt : theme.langflow), []);
            await m.reply(output.answer.text);
        } else {
            throw "Invalid input format. Use 1|text or 2|text.";
        }

    } catch (e) {
        await m.reply(`Error: ${e.message}`);
    }
};

handler.help = ["mendable"];
handler.tags = ["gpt"];
handler.command = /^(mendable)$/i;

export default handler;

/* New Line */

async function createConversation(api_key) {
    const url = "https://api.mendable.ai/v0/newConversation";
    const data = {
        api_key
    };

    try {
        const r = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const { conversation_id } = await r.json();
        return conversation_id;

    } catch (error) {
        throw new Error(`Failed to create conversation: ${error.message}`);
    }
}

async function createChat(question, api_key, history = []) {
    try {
        let conversation_id = await createConversation(api_key);
        const data = {
            anon_key,
            question,
            history: history,
            shouldStream: false,
            conversation_id,
        };

        const url = "https://api.mendable.ai/v0/mendableChat";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(`Failed to create chat: ${error.message}`);
    }
}
