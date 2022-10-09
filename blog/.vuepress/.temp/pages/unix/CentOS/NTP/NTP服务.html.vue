<template><div><h1 id="ntp" tabindex="-1"><a class="header-anchor" href="#ntp" aria-hidden="true">#</a> NTP</h1>
<h3 id="一、关于时区与网络校时的通讯协议" tabindex="-1"><a class="header-anchor" href="#一、关于时区与网络校时的通讯协议" aria-hidden="true">#</a> 一、关于时区与网络校时的通讯协议</h3>
<h4 id="_1-时区" tabindex="-1"><a class="header-anchor" href="#_1-时区" aria-hidden="true">#</a> 1.时区</h4>
<p>地球为 360 度 -&gt; 根据 24 小时一自转 -&gt; 分成 24 个时区 -&gt; 每个时区 1 小时即 15 度</p>
<p>已 GMT 为 0 时区（即标准时间，经度为 0 W/E） -&gt; 根据地理位置的经纬度推断中国在东八区 GMT + 8</p>
<p>这也是为什么安装 linux 后可能出现时差 8 小时的原因</p>
<ul>
<li>
<p>GMT：GMT 时间是以太阳通过格林威治的那一刻来作为计时的标准</p>
</li>
<li>
<p>UTC：最准确的计算应该是使用『原子震荡周期』所计算的物理时钟了 (Atomic Clock, 也被称为原子钟)，
这也被定义为标准时间 (International Atomic Time)。而我们常常看见的 UTC 也就是
Coordinated Universal Time (协和标准时间)就是利用这种 Atomic Clock 为基准所定义出来的正确时间。
UTC 时间与 GMT 时间有差不多 16 分钟的误差呢！</p>
</li>
</ul>
<h4 id="_2-ntp-通讯协议" tabindex="-1"><a class="header-anchor" href="#_2-ntp-通讯协议" aria-hidden="true">#</a> 2.NTP 通讯协议</h4>
<ul>
<li>软件时钟：由 Linux 操作系统根据 1970/01/01 开始计算的总秒数； 即 date 这个指令的时间</li>
<li>硬件时钟：主机硬件系统上面的时钟，例如 BIOS 记录的时间；</li>
</ul>
</div></template>


