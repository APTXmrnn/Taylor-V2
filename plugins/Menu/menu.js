/* Recode Wudysoft */
import {
    promises,
    readFileSync
} from "fs"
import {
    join
} from "path"
import {
    xpRange
} from "../../lib/levelling.js"
import moment from "moment-timezone"
import os from "os"
import fs from "fs"
import fetch from "node-fetch"

const defaultMenu = {
    before: `%dash

%m1 *U S E R*
%m2 *Name:* %name
%m2 *Tag:* %tag
%m2 *Status:* %prems
%m2 *Limit:* %limit
%m2 *Money:* %money
%m2 *Role:* %role
%m2 *Level:* %level [ %xp4levelup Xp For Levelup]
%m2 *Xp:* %exp / %maxexp
%m2 *Total Xp:* %totalexp
%m3

%m1 *T O D A Y*
%m2 *%ucpn*
%m2 *Days:* %week %weton
%m2 *Date:* %date
%m2 *Islamic Date:* %dateIslamic
%m2 *Time:* %wita
%m3

%m1 *I N F O*
%m2 *Bot Name:* %me
%m2 *Mode:* %mode
%m2 *Platform:* %platform
%m2 *Type:* Node.Js
%m2 *Baileys:* Multi Device
%m2 *Prefix:* [ *%_p* ]
%m2 *Uptime:* %muptime
%m2 *Database:* %rtotalreg dari %totalreg
%m3

%m1 *I N F O  C M D* 
%m4 *%totalfeatures* Command
%m4 *Ⓟ* = Premium
%m4 *Ⓛ* = Limit
%m3
%readmore
`.trimStart(),
    header: "%cc *%category* %c1",
    body: "%c2 %cmd %isPremium %islimit",
    footer: "%c3",
    after: "%c4                %me",
}
let handler = async (m, {
    conn,
    usedPrefix: _p,
    __dirname,
    args
}) => {
    let soun = ["aku-ngakak",
        "anjay",
        "ara-ara2",
        "ara-ara-cowok",
        "ara-ara",
        "arigatou",
        "assalamualaikum",
        "asu",
        "ayank",
        "bacot",
        "bahagia-aku",
        "baka",
        "bansos",
        "beat-box2",
        "beat-box",
        "biasalah",
        "bidadari",
        "bot",
        "buka-pintu",
        "canda-anjing",
        "cepetan",
        "china",
        "cuekin-terus",
        "daisuki-dayo",
        "daisuki",
        "dengan-mu",
        "Donasiku",
        "gaboleh-gitu",
        "gak-lucu",
        "gamau",
        "gay",
        "gelay",
        "gitar",
        "gomenasai",
        "hai-bot",
        "hampa",
        "hayo",
        "hp-iphone",
        "ih-wibu",
        "i-like-you",
        "india",
        "karna-lo-wibu",
        "kiss",
        "kontol",
        "ku-coba",
        "maju-wibu",
        "makasih",
        "mastah",
        "menuasli",
        "menuku",
        "menu",
        "MenuYuki",
        "nande-nande",
        "nani",
        "ngadi-ngadi",
        "nikah",
        "nuina",
        "onichan",
        "ownerku",
        "owner-sange",
        "pak-sapardi",
        "pale",
        "pantek",
        "pasi-pasi",
        "punten",
        "sayang",
        "siapa-sih",
        "sudah-biasa",
        "summertime",
        "tanya-bapak-lu",
        "to-the-bone",
        "wajib",
        "waku",
        "woi",
        "yamete",
        "yowaimo",
        "yoyowaimo"
    ].getRandom()
    let vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/" + soun + ".mp3"

    await conn.sendReact(m.chat, "⏳", m.key)
    let spas = "                "
    let spas2 = "         "
    let mojis = "╰╴"
    let index = 0
    let ktnya = ["Kamu nanya?",
        "No spam...",
        "Thanks..",
        "Menampilkan...",
        "Tunggu...",
        "Proses...",
        "Loading...",
        "Bertanya..",
        "Hooh..."
    ]
    let ktx = ktnya.getRandom()
    let tags = {
        "main": "Main",
        "rpg": "RolePlay Games",
        "xp": "Exp & Limit",
        "jadian": "Jadian",
        "sticker": "Sticker",
        "edukasi": "Edukasi",
        "quran": "Al Quran",
        "ai": "AI",
        "gpt": "GPT",
        "tools": "Tools",
        "kerang": "Kerang Ajaib",
        "primbon": "Primbon",
        "fun": "Fun",
        "game": "Game",
        "genshin": "Genshin Impact",
        "quotes": "Quotes",
        "audio": "Audio",
        "maker": "Maker",
        "music": "Music",
        "downloader": "Downloader",
        "internet": "Internet",
        "random": "Random",
        "nsfw": "Nsfw",
        "nulis": "MagerNulis & Logo",
        "anonymous": "Anonymous Chat",
        "database": "Database",
        "admin": "Admin",
        "group": "Group",
        "vote": "Voting",
        "absen": "Absen",
        "premium": "Premium",
        "advanced": "Advanced",
        "info": "Info",
        "owner": "Owner",
        "jadibot": "Jadi Bot",
        "host": "Host",
        "Baileys": "Baileys",
        "store": "Store Menu",
        "virus": "𐐪-〚 Virtex 〛-𐑂",
        "thnks": "Thanks To",
        "nocategory": "No Category",
    }
    try {
        // DEFAULT MENU
        let dash = global.dashmenu
        let m1 = global.dmenut
        let m2 = global.dmenub
        let m3 = global.dmenuf
        let m4 = global.dmenub2

        // COMMAND MENU
        let cc = global.cmenut
        let c1 = global.cmenuh
        let c2 = global.cmenub
        let c3 = global.cmenuf
        let c4 = global.cmenua

        // LOGO L P
        let lprem = global.lopr
        let llim = global.lolm
        let tag = `@${m.sender.split("@")[0]}`

        /* Gobal */
        let glb = global.db.data.users
        let usrs = glb[m.sender]

        /* Hiasan List */
        let spas = "                "
        let spas2 = "         "
        let mojis = "╰╴"
        let index = 0
        let ktnya = ["Kamu nanya?", "No spam...", "Thanks..", "Menampilkan...", "Tunggu...", "Proses...", "Loading...", "Bertanya..", "Hooh..."]
        let ktx = ktnya.getRandom()

        /* TIME ZONE */
        let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss")
        let wibh = moment.tz("Asia/Makassar").format("HH")
        let wibm = moment.tz("Asia/Makassar").format("mm")
        let wibs = moment.tz("Asia/Makassar").format("ss")
        let wita = moment.tz("Asia/Makassar").format("HH:mm:ss")
        let waktuwita = `${wibh} H ${wibm} M ${wibs} S`

        /* Info Menu */
        let mode = global.opts["self"] ? "Private" : "Publik"
        let _package = JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))) || {}
        let {
            age,
            exp,
            limit,
            level,
            role,
            registered,
            money
        } = glb[m.sender]
        let {
            min,
            xp,
            max
        } = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        let premium = glb[m.sender].premiumTime
        let prems = `${premium > 0 ? "Premium": "Free"}`
        let platform = os.platform()

        //-----------TIME---------
        let ucpn = `${ucapan()}`
        let d = new Date(new Date + 3600000)
        let locale = "id"
        // d.getTimeZoneOffset()
        // Offset -420 is 18.00
        // Offset    0 is  0.00
        // Offset  420 is  7.00
        let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor(d / 84600000) % 5]
        let week = d.toLocaleDateString(locale, {
            weekday: "long"
        })
        let date = d.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(d)
        let time = d.toLocaleTimeString(locale, {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        })
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send("uptime")
            _muptime = await new Promise(resolve => {
                process.once("message", resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)

        //---------------------
        let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
        let totalreg = Object.keys(glb).length
        let rtotalreg = Object.values(glb).filter(user => user.registered == true).length
        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: "customPrefix" in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            }
        })
        for (let plugin of help)
            if (plugin && "tags" in plugin)
                for (let tag of plugin.tags)
                    if (!(tag in tags) && tag) tags[tag] = tag
        conn.menu = conn.menu ? conn.menu : {}
        let before = conn.menu.before || defaultMenu.before
        let header = conn.menu.header || defaultMenu.header
        let body = conn.menu.body || defaultMenu.body
        let footer = conn.menu.footer || defaultMenu.footer
        let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? "" : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
        let _text = [
            before,
            ...Object.keys(tags).map(tag => {
                return header.replace(/%category/g, tags[tag]) + "\n" + [
                    ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                        return menu.help.map(help => {
                            return body.replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                                .replace(/%islimit/g, menu.limit ? "Ⓛ" : "")
                                .replace(/%isPremium/g, menu.premium ? "🅟" : "")
                                .trim()
                        }).join("\n")
                    }),
                    footer
                ].join("\n")
            }),
            after
        ].join("\n")
        let text = typeof conn.menu == "string" ? conn.menu : typeof conn.menu == "object" ? _text : ""
        let replace = {
            "%": "%",
            p: _p,
            uptime,
            muptime,
            me: conn.getName(conn.user.jid),
            npmname: _package.name,
            npmdesc: _package.description,
            version: _package.version,
            exp: exp - min,
            maxexp: xp,
            totalexp: exp,
            xp4levelup: max - exp,
            github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
            tag,
            dash,
            m1,
            m2,
            m3,
            m4,
            cc,
            c1,
            c2,
            c3,
            c4,
            lprem,
            llim,
            ucpn,
            platform,
            wita,
            mode,
            _p,
            money,
            age,
            tag,
            name,
            prems,
            level,
            limit,
            name,
            weton,
            week,
            date,
            dateIslamic,
            time,
            totalreg,
            totalfeatures,
            rtotalreg,
            role,
            readmore: readMore
        }
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name])
        let pp = [thumbdoc, thumb].getRandom() || fla + "menu " + teks

        //------------------< MENU >----------------
        /*
        let pusat = ["ke1", "ke2", "ke3", "ke4", "ke5", "ke6"]
        let pilih = pusat.getRandom()
        if (pilih == "ke1") {
            await conn.sendButton(m.chat, text.trim(), author, knimg, [
                [emojis + " All Menu", _p + "allmenu"],
                [emojis + " List Menu", _p + "menulist"]
            ], fakes, fakefb)
        }
        if (pilih == "ke2") {
            await conn.send2ButtonLoc(m.chat, knimg, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, fakefb)
        }
        if (pilih == "ke3") {
            await conn.send2ButtonVid(m.chat, knimg, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, adReplyS)
        }
        if (pilih == "ke4") {
            await conn.sendTemplateButtonLoc(m.chat, knimg, text.trim(), author, emojis + " List Menu", _p + "menulist", fakes, fakefb)
        }
        if (pilih == "ke5") {
            await conn.relayMessage(m.chat, {
                requestPaymentMessage: {
                    currencyCodeIso4217: "USD",
                    amount1000: fsizedoc,
                    requestFrom: m.sender,
                    noteMessage: {
                        extendedTextMessage: {
                            text: text.trim(),
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    showAdAttribution: true
                                }
                            }
                        }
                    }
                }
            }, {})
        }
        if (pilih == "ke6") {
            await conn.send2ButtonDoc(m.chat, text.trim(), author, emojis + " All Menu", _p + "allmenu", emojis + " List Menu", _p + "menulist", fakes, adReply)
        }
        
        // Biasa
        if (pilih) {
        let biasa = "_Ketik *.menubiasa* jika menu tidak muncul_"
        await conn.sendMessage(m.chat, { text: biasa }, { quoted: m })
        }
        
        // Sound
        var vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/bot.mp3"
        await conn.sendMessage(m.chat, { audio: { url: vn }, seconds: fsizedoc, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
        */

        // Biasa
        const caption = text.trim();
        conn.temabot = conn.temabot ? conn.temabot : {
            id: 1
        }
        if (conn.temabot.id === 1) {
            await conn.reply(
                m.chat,
                caption,
                m, {
                    contextInfo: {
                        mentionedJid: [m.sender]
                    },
                }
            );
        } else if (conn.temabot.id === 2) {
            await conn.reply(
                m.chat,
                caption,
                m, {
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: ucapan() + " " + m.name,
                            thumbnail: await (await conn.resize([logo, imagebot].getRandom(), 300, 150))
                        },
                    },
                }
            );
        } else if (conn.temabot.id === 3) {
            await conn.reply(
                m.chat,
                caption,
                m, {
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: ucapan() + " " + m.name,
                            body: bottime,
                            mediaType: 1,
                            previewType: 0,
                            renderLargerThumbnail: true,
                            thumbnailUrl: [logo, imagebot].getRandom(),
                            sourceUrl: ''
                        }
                    },
                }
            );
        } else if (conn.temabot.id === 4) {
            await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
                mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
                fileLength: fsizedoc,
                pageCount: fpagedoc,
                jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            });
        } else if (conn.temabot.id === 5) {
            await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
                mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
                fileLength: fsizedoc,
                pageCount: fpagedoc,
                jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: ucapan() + " " + m.name,
                        thumbnail: await (await conn.resize([logo, imagebot].getRandom(), 300, 150))
                    }
                }
            });
        } else if (conn.temabot.id === 6) {
            await conn.sendFile(m.chat, Buffer.alloc(0), "D A S H B O A R D", caption, fakes, false, {
                mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
                fileLength: fsizedoc,
                pageCount: fpagedoc,
                jpegThumbnail: await conn.resize([thumbdoc, thumb].getRandom(), 300, 150),
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: ucapan() + " " + m.name,
                        body: bottime,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: [logo, imagebot].getRandom(),
                        sourceUrl: ''
                    }
                }
            });
        } else if (conn.temabot.id === 7) {
            await conn.relayMessage(m.chat, {
                requestPaymentMessage: {
                    currencyCodeIso4217: 'INR',
                    amount1000: fsizedoc,
                    requestFrom: '0@s.whatsapp.net',
                    noteMessage: {
                        extendedTextMessage: {
                            text: caption,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    showAdAttribution: true
                                }
                            }
                        }
                    }
                }
            }, {});
        } else if (conn.temabot.id === 8) {
            await conn.sendMessage(m.chat, {
                video: {
                    url: giflogo
                },
                caption: caption,
                gifPlayback: true,
                gifAttribution: Math.floor(Math.random() * 2) + 1
            }, {
                quoted: m
            });
        }
        await conn.sendPresenceUpdate('recording', m.chat);
        await conn.sendFile(m.chat, vn, '', '', m, null, {
            ptt: true,
            waveform: [100, 0, 100, 0, 100, 0, 100],
            contextInfo: adReplyS.contextInfo
        });
        await conn.sendReact(m.chat, "✅", m.key)
        // Biasa
    } catch (e) {
        await conn.reply(m.chat, "Maaf, menu sedang error", m)
        throw e
    }
}
handler.command = /^(allmenu|help|\?)$/i

handler.exp = 3

export default handler
//----------- FUNCTION -------

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
}

function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
}

function ucapan() {
    let waktunya = moment.tz("Asia/Makassar").format("HH");
    return waktunya >= 24 ? "Selamat Begadang 🗿" :
        waktunya >= 18 ? "Selamat malam 🌙" :
        waktunya >= 15 ? "Selamat sore 🌅" :
        waktunya > 10 ? "Selamat siang ☀️" :
        waktunya >= 4 ? "Selamat pagi 🌄" :
        "Selamat Pagi 🗿";
}