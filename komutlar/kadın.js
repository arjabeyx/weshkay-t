const Discord = require('discord.js');
const db = require('quick.db')
  //CodeArius
exports.run = async (client, message, args) => {
let kayityetkili = '918580290643980329' //Yetkili
let codeariusver = '918580317617549352' //Verilecek
let kadin2 = '918580318280237087' //Verilecek
let codeariusal = '918580325548978228' //Alınacak
let isimön = '•' //İsmin önüne gelecek simge,tag   

  if(!message.member.roles.cache.has(kayityetkili))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Bir üye etiketlemelisin.')  //CodeArius
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') //CodeArius
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)  //CodeArius
  let toplamaisim = `${isimön} ${isim} ${yaş}`
    //CodeArius
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.roles.add(codeariusver)  //CodeArius
  },2000)
    setTimeout(function(){
  member.roles.add(kadin2)  //CodeArius
  },3000)
  setTimeout(function(){
  member.roles.remove(codeariusal)
  },4000)
  //CodeArius
let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'
const emoji = client.emojis.cache.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıtk_${message.author.id}`, 1)  //CodeArius
  db.add(`kayıttoplam_${message.author.id}` , 1)
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)  //CodeArius
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> ve <@&${kadin2}> rolü verildi.

<@!${message.author.id}> **Kişisinin toplam** ${toplam} **adet kayıt oldu.**
`)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('webmafyasi.net')
  .setThumbnail("https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif")
message.channel.send(embed)
  }
  if(kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş.** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTimestamp()
  .setFooter('webmafyasi.net')  //CodeArius
  .setThumbnail("https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif")
message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kadın'],
  permLevel: 0
}
exports.help = {
  name: 'k',
  description: "Kadın kullanıcıları kayıt etme komutu.",
  usage: 'kadın @kişi isim yaş'
}