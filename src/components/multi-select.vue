<template>
  <div class="address">
    <div
      class="addressboxbg"
      @click="cancel"
    ></div>
    <div class="addressbox">
      <p class="text_btn"><span
          style="float:left;"
          @click="cancel"
        >取消</span><span
          style="float:right;color:#107E52;"
          @click="complete"
        >完成</span></p>
      <div class="addressSelect">
        <div class="selectbox"></div>
        <ul
          @touchstart="touchStart($event,'province')"
          @touchmove="touchMove($event,'province')"
          @touchend="touchEnd($event,'province')"
          :style="provinceStyle"
          :class="[{'selectAni':addSelect}]"
        >
          <li
            v-for="(item,index) in provinces"
            :class="[{'addSelectActive':index == provinceIndex}]"
            :key="index"
          >{{item.name}}</li>
        </ul>
        <ul
          @touchstart="touchStart($event,'city')"
          @touchmove="touchMove($event,'city')"
          @touchend="touchEnd($event,'city')"
          :style="cityStyle"
          :class="[{'selectAni':addSelect}]"
        >
          <li
            v-for="(item,index) in citys"
            :class="[{'addSelectActive':index == cityIndex}]"
            :key="index"
          >{{item.name}}</li>
        </ul>
        <ul
          @touchstart="touchStart($event,'district')"
          @touchmove="touchMove($event,'district')"
          @touchend="touchEnd($event,'district')"
          :style="districtStyle"
          :class="[{'selectAni':addSelect}]"
        >
          <li
            v-for="(item,index) in areas"
            :class="[{'addSelectActive':index == districtIndex}]"
            :key="index"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {  queryCity, queryArea }  from '@/api'

export default {
  name: "multi-select",
  props: {
    provinces: {
      type: Array
    }
  },
  data() {
    return {
      citys: [],
      areas: [],
      provinceStyle: {
        WebkitTransform: "translate3d(0px,0px,0px)"
      },
      cityStyle: {
        WebkitTransform: "translate3d(0px,0px,0px)"
      },
      districtStyle: {
        WebkitTransform: "translate3d(0px,0px,0px)"
      },
      startTop: 0,
      provinceIndex: 0,
      cityIndex: 0,
      districtIndex: 0,
      translateY: 0,
      maxScroll: 0,
      addHeight: 0,
      addSelect: false,
      provinceVal: "",
      cityVal: "",
      areaVal: "",
      val: {
        provinceVal: "",
        cityVal: "",
        areaVal: ""
      }
    };
  },
  watch: {
    // 监听省滑动
    provinceVal(value) {
      queryCity(value).then(res => {
        if (res.code === '000000') {
          this.citys = res.obj
          this.cityVal = this.citys[0].value;
        }
      });
    },
    // 监听市滑动
    cityVal(value) {
      queryArea(value).then(res => {
        if (res.code === '000000') {
          this.areas = res.obj
          this.areaVal = this.areas[0].value;
        }
      });
    }
  },
  created() {

  },
  methods: {
    // 点击取消
    cancel() {
      this.$emit("cancel", false);
    },
    // 点击完成
    complete() {
      if (!this.provinceVal || !this.cityVal ||  !this.areaVal) {
        return false
      }
      this.$emit("complete", this.val);
    },
    // 滑动开始
    touchStart(e, val) {
      e.preventDefault();
      this.addSelect = false;
      this.addHeight = e.currentTarget.children[0].offsetHeight;
      this.maxScroll = this.addHeight * e.currentTarget.children.length;
      this.startTop = e.targetTouches[0].pageY;
      switch (val) {
        case "province":
          this.translateY = parseInt(
            this.provinceStyle.WebkitTransform.slice(
              this.provinceStyle.WebkitTransform.indexOf(",") + 1,
              this.provinceStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          break;
        case "city":
          this.translateY = parseInt(
            this.cityStyle.WebkitTransform.slice(
              this.cityStyle.WebkitTransform.indexOf(",") + 1,
              this.cityStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          break;
        case "district":
          this.translateY = parseInt(
            this.districtStyle.WebkitTransform.slice(
              this.districtStyle.WebkitTransform.indexOf(",") + 1,
              this.districtStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          break;
        default:
          break;
      }
    },
    // 滑动进行中
    touchMove(e, val) {
      e.preventDefault();
      switch (val) {
        case "province":
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.provinceStyle.WebkitTransform = "translate3d(0px,0px,0px)";
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.provinceStyle.WebkitTransform =
              "translate3d(0px," +
              -(this.maxScroll - this.addHeight) +
              "px,0px)";
          } else {
            this.provinceStyle.WebkitTransform =
              "translate3d(0px," +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              "px,0px)";
          }
          break;
        case "city":
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.cityStyle.WebkitTransform = "translate3d(0px,0px,0px)";
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.cityStyle.WebkitTransform =
              "translate3d(0px," +
              -(this.maxScroll - this.addHeight) +
              "px,0px)";
          } else {
            this.cityStyle.WebkitTransform =
              "translate3d(0px," +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              "px,0px)";
          }
          break;
        case "district":
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.districtStyle.WebkitTransform = "translate3d(0px,0px,0px)";
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.districtStyle.WebkitTransform =
              "translate3d(0px," +
              -(this.maxScroll - this.addHeight) +
              "px,0px)";
          } else {
            this.districtStyle.WebkitTransform =
              "translate3d(0px," +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              "px,0px)";
          }
          break;
        default:
          break;
      }
    },
    // 滑动结束
    touchEnd(e, val) {
      e.preventDefault();
      this.addSelect = true;
      switch (val) {
        case "province":
          let provinceTranslateY = parseInt(
            this.provinceStyle.WebkitTransform.slice(
              this.provinceStyle.WebkitTransform.indexOf(",") + 1,
              this.provinceStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          this.provinceIndex = -Math.round(provinceTranslateY / this.addHeight);
          this.provinceStyle.WebkitTransform =
            "translate3d(0px," +
            Math.round(provinceTranslateY / this.addHeight) * this.addHeight +
            "px,0px)";
          this.cityStyle.WebkitTransform = this.districtStyle.WebkitTransform =
            "translate3d(0px,0px,0px)";
          this.cityIndex = this.districtIndex = 0;
          break;
        case "city":
          let cityTranslateY = parseInt(
            this.cityStyle.WebkitTransform.slice(
              this.cityStyle.WebkitTransform.indexOf(",") + 1,
              this.cityStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          this.cityIndex = -Math.round(cityTranslateY / this.addHeight);
          this.cityStyle.WebkitTransform =
            "translate3d(0px," +
            Math.round(cityTranslateY / this.addHeight) * this.addHeight +
            "px,0px)";
          this.districtStyle.WebkitTransform = "translate3d(0px,0px,0px)";
          this.districtIndex = 0;
          break;
        case "district":
          let districtTranslateY = parseInt(
            this.districtStyle.WebkitTransform.slice(
              this.districtStyle.WebkitTransform.indexOf(",") + 1,
              this.districtStyle.WebkitTransform.lastIndexOf(",")
            )
          );
          this.districtIndex = -Math.round(districtTranslateY / this.addHeight);
          this.districtStyle.WebkitTransform =
            "translate3d(0px," +
            Math.round(districtTranslateY / this.addHeight) * this.addHeight +
            "px,0px)";
          break;
        default:
          break;
      }
      // 滑动结束后 处理数据
      this.dataProcessing(val);
    },
    // 数据处理
    dataProcessing(val) {
      // 滑动数据传输 数据处理
      if (val == 'province') {
        console.log(this.provinceIndex,'this.provinceIndex')
        this.val.province = this.provinces[this.provinceIndex];
        console.log(this.val.province,'this.val.province')
        this.provinceVal = this.provinces[this.provinceIndex].code;

      } else if (val == 'city') {
        console.log(this.cityIndex,'this.cityIndex')
        this.val.city = this.citys[this.cityIndex];
        console.log(this.val.city,'this.val.city')
        this.cityVal = this.citys[this.cityIndex].code;

      } else if (val == 'district') {
        console.log(this.districtIndex,'this.districtIndex')
        this.val.area = this.areas[this.districtIndex];
        console.log(this.val.area,'this.val.area')
        this.areaVal = this.areas[this.districtIndex].code;

      }
    }
  }
};
</script>

<style lang="stylus">
.address {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

.address .addressbox {
  height: 30%;
  position: absolute;
  z-index: 101;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  background: #fff;
  bottom: 0px;
}

.address .addressbox .text_btn {
  height: 60px;
  font-size: 28px;
  line-height: 60px;
  border-top: 1px solid #ccc; /* no */
  border-bottom: 1px solid #ccc; /* no */
  padding: 0 10px;
  background: #F9F9F9;
}

.addressSelect .selectbox {
  width: 100%;
  height: 60px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 60px;
  background: #F9F9F9;
}

.address .addressboxbg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.addressSelect {
  width: 100%;
  position: relative;
  background: #fff;
  height: 190px;
  overflow: hidden;
  -webkit-mask-box-image: linear-gradient(0deg, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
  font-size: 28px;
}

.addressSelect ul {
  width: 33.333333%;
  position: absolute;
  left: 0;
  top: 60px;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  text-align: center;
  padding-left: 0;
}

.addressSelect ul li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.54);
  padding: 20px 0;
}

.addressSelect ul:nth-of-type(2) {
  left: 33.333333%;
}

.addressSelect ul:nth-of-type(3) {
  left: 66.666666%;
}

.addressSelect ul li.addSelectActive {
  color: rgba(0, 0, 0, 0.87);
  transform: scale(1.1);
  transition: 0.5s;
}

.selectAni {
  transition: 0.8s;
}
</style>