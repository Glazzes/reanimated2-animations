import {Skia, SkSVG} from '@shopify/react-native-skia';
import {charInfo, Origin, selectionColors} from './data';

export const buildSkiaSvgPath = (
  origins: Origin[],
  length: number,
  R: number,
): SkSVG => {
  const SIZE = R * 2;
  let colorSlices = `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns='http://www.w3.org/2000/svg'>`;

  for (let i = 0; i < length; i++) {
    const {start, end} = origins[i];
    const currentPath = [
      `M ${end.x} ${end.y}`,
      `A ${R} ${R} 0 0 1 ${start.x} ${start.y}`,
      `L ${R} ${R} z`,
    ].join(' ');

    const path = `<path d="${currentPath}" fill="${selectionColors[i]}" stroke="#fff" stroke-width="1" />`;
    colorSlices += path;
  }

  colorSlices += '</svg>';
  return Skia.SVG.MakeFromString(colorSlices)!;
};

export const buildSkiaSvgChart = (
  origins: Origin[],
  length: number,
  strokeWidth: number,
  R: number,
): SkSVG => {
  const SIZE = R * 2;
  let path = `<svg width="${SIZE}" height="${SIZE}" x="${strokeWidth}" y="${strokeWidth}" viewBox="${-strokeWidth} ${-strokeWidth} ${
    SIZE + strokeWidth * 2
  } ${SIZE + strokeWidth * 2}" xmlns='http://www.w3.org/2000/svg'>`;

  for (let i = 0; i < length; i++) {
    const {start, end} = origins[i];
    const currentPath = [
      `M ${end.x} ${end.y}`,
      `A ${R} ${R} 0 0 1 ${start.x} ${start.y}`,
      `L ${R} ${R} z`,
    ].join(' ');

    const percentage = `<path d="${currentPath}" fill="${charInfo[i].color}" stroke="#fff" stroke-width="${strokeWidth}" />`;
    path += percentage;
  }

  path += `<circle r="${R / 2}" cx="${R}" cy="${R}" fill="#fff" />`;
  path += '</svg>';
  return Skia.SVG.MakeFromString(path)!;
};
