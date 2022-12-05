<script lang="ts" setup></script>

<template>
  <div class="px-5">
    <a-typography-title :heading="4">
      帮助
    </a-typography-title>
    <a-typography-paragraph>
      地图编辑器是一个用于创建、查看和共享地图的快速、简单的工具。地图编辑器以GeoJSON命名，GeoJSON是一种开源的空间数据格式，它在所有方面都支持GeoJSON——但也接受KML、GPX、CSV、GTFS、TopoJSON和其他格式。
    </a-typography-paragraph>
    <a-typography-title :heading="5">
      我想要画出图形
    </a-typography-title>
    <a-typography-paragraph>
      使用绘图工具绘制点、多边形、直线、矩形和圆。在你画完形状之后，你可以通过点击它，编辑特征的属性，然后点击“保存”来为每个特征添加信息。
      注意:GeoJSON不支持圆，所以画圆工具实际上是创建一个具有64个顶点的圆形多边形。
    </a-typography-paragraph>
    <a-typography-title :heading="5">
      我想编辑功能
    </a-typography-title>
    <a-typography-paragraph>
      要编辑几何图形，请单击编辑按钮以进入编辑模式。默认选择“所有功能”。单击以选择一个特征或顶点。按delete删除选中的特征或顶点。拖动可移动所选顶点。按Shift +拖动移动选定的功能
      GeoJSON中的属性存储为“键值对”。你可以用三种方式编辑属性:1 -点击地图上的特征，在弹出的窗口中编辑属性。2 -编辑数据表中的属性，3 -编辑代码编辑器中的属性
    </a-typography-paragraph>
    <a-divider />
    <a-typography-title :heading="4">
      地图编辑器 API
    </a-typography-title>
    <a-typography-paragraph>
      您可以与geojson交互。IO编程通过url参数:
    </a-typography-paragraph>
    <a-typography-title :heading="5">
      URL API
    </a-typography-title>
    <a-typography-paragraph>
      您可以只用url和geojson.io做一些有趣的事情。这里是

      当前的URL格式。
    </a-typography-paragraph>
    <a-typography-title :heading="6">
      地图
    </a-typography-title>

    <a-typography-paragraph>
      在特定位置打开地图。参数是用/分隔的数字

      形式为变焦/纬度/经度。
    </a-typography-paragraph>
    <a-typography-title :heading="6">
      例子:
    </a-typography-title>
    <a-typography-paragraph>
      http://geojson.io/#map=2/20.0/0.0
    </a-typography-paragraph>
  </div>
</template>
