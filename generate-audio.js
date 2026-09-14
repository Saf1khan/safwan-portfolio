const fs = require("fs");
const path = require("path");

const sampleRate = 44100;
const durationSeconds = 12;
const totalSamples = sampleRate * durationSeconds;
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM format
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(bytesPerSample * 8, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);

// Ambient lofi chill chord progression: Em7 - Cmaj7 - G - D
const chords = [
  [164.81, 196.00, 246.94, 293.66], // Em7
  [130.81, 164.81, 196.00, 246.94], // Cmaj7
  [196.00, 246.94, 293.66, 392.00], // G
  [146.83, 220.00, 293.66, 369.99]  // D
];

let offset = 44;
const sectionDuration = durationSeconds / chords.length;

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  const chordIdx = Math.floor(t / sectionDuration) % chords.length;
  const chord = chords[chordIdx];
  const sectionT = (t % sectionDuration) / sectionDuration;
  
  // Smooth swell envelope
  const envelope = Math.sin(sectionT * Math.PI) * 0.28;

  let sample = 0;
  for (let idx = 0; idx < chord.length; idx++) {
    const f = chord[idx];
    sample += Math.sin(2 * Math.PI * f * t) * 0.22;
    sample += Math.sin(2 * Math.PI * f * 2 * t) * 0.04;
  }
  sample *= envelope;

  const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
  buffer.writeInt16LE(intSample, offset);
  buffer.writeInt16LE(intSample, offset + 2);
  offset += 4;
}

const outDir = path.join(__dirname, "public", "audio");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, "bg-music.mp3"), buffer);
console.log("Generated ambient audio track successfully:", buffer.length, "bytes");
