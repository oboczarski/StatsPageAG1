export { default as IconActivity } from "@tabler-icons-svg/activity.svg?raw";
export { default as IconAlertTriangle } from "@tabler-icons-svg/alert-triangle.svg?raw";
export { default as IconArrowsLeftRight } from "@tabler-icons-svg/arrows-left-right.svg?raw";
export { default as IconArrowsMoveHorizontal } from "@tabler-icons-svg/arrows-move-horizontal.svg?raw";
export { default as IconArrowsSort } from "@tabler-icons-svg/arrows-sort.svg?raw";
export { default as IconBallAmericanFootball } from "@tabler-icons-svg/ball-american-football.svg?raw";
export { default as IconBadge } from "@tabler-icons-svg/badge.svg?raw";
export { default as IconBinaryTree2 } from "@tabler-icons-svg/binary-tree-2.svg?raw";
export { default as IconBolt } from "@tabler-icons-svg/bolt.svg?raw";
export { default as IconCalendarStats } from "@tabler-icons-svg/calendar-stats.svg?raw";
export { default as IconCalendarTime } from "@tabler-icons-svg/calendar-time.svg?raw";
export { default as IconChartBar } from "@tabler-icons-svg/chart-bar.svg?raw";
export { default as IconChartDonut } from "@tabler-icons-svg/chart-donut.svg?raw";
export { default as IconChartLine } from "@tabler-icons-svg/chart-line.svg?raw";
export { default as IconChevronDown } from "@tabler-icons-svg/chevron-down.svg?raw";
export { default as IconChevronRight } from "@tabler-icons-svg/chevron-right.svg?raw";
export { default as IconCircleLetterG } from "@tabler-icons-svg/circle-letter-g.svg?raw";
export { default as IconClockHour4 } from "@tabler-icons-svg/clock-hour-4.svg?raw";
export { default as IconFilter } from "@tabler-icons-svg/filter.svg?raw";
export { default as IconFlag } from "@tabler-icons-svg/flag.svg?raw";
export { default as IconFlame } from "@tabler-icons-svg/flame.svg?raw";
export { default as IconGauge } from "@tabler-icons-svg/gauge.svg?raw";
export { default as IconHelmet } from "@tabler-icons-svg/helmet.svg?raw";
export { default as IconMedal } from "@tabler-icons-svg/medal.svg?raw";
export { default as IconMenu2 } from "@tabler-icons-svg/menu-2.svg?raw";
export { default as IconRoute } from "@tabler-icons-svg/route.svg?raw";
export { default as IconRulerMeasure } from "@tabler-icons-svg/ruler-measure.svg?raw";
export { default as IconRun } from "@tabler-icons-svg/run.svg?raw";
export { default as IconShieldX } from "@tabler-icons-svg/shield-x.svg?raw";
export { default as IconSortAscending } from "@tabler-icons-svg/sort-ascending.svg?raw";
export { default as IconSortDescending } from "@tabler-icons-svg/sort-descending.svg?raw";
export { default as IconSparkles } from "@tabler-icons-svg/sparkles.svg?raw";
export { default as IconStars } from "@tabler-icons-svg/stars.svg?raw";
export { default as IconTarget } from "@tabler-icons-svg/target.svg?raw";
export { default as IconTargetArrow } from "@tabler-icons-svg/target-arrow.svg?raw";
export { default as IconTrophy } from "@tabler-icons-svg/trophy.svg?raw";
export { default as IconUser } from "@tabler-icons-svg/user.svg?raw";
export { default as IconWaveSine } from "@tabler-icons-svg/wave-sine.svg?raw";
export { default as IconWind } from "@tabler-icons-svg/wind.svg?raw";

export function renderTablerIcon(
  iconSvg,
  {
    className = "dh-grid-icon",
    size = 24,
    strokeWidth = 1.85,
  } = {},
) {
  if (!iconSvg) {
    return "";
  }

  return iconSvg
    .trim()
    .replace(/\swidth="[^"]*"/, ` width="${size}"`)
    .replace(/\sheight="[^"]*"/, ` height="${size}"`)
    .replace(/\sstroke-width="[^"]*"/, ` stroke-width="${strokeWidth}"`)
    .replace(/\sclass="[^"]*"/, ` class="${className}"`)
    .replace("<svg", '<svg aria-hidden="true" focusable="false"');
}
