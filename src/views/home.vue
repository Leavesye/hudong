<template>
  <div class="home">
    <div class="header">
      <img
        src="~@/assets/images1/card.png"
        alt="???"
        class="info-i"
      >
      <div class="info">个人信息</div>
    </div>
    <div class="content">
      <div class="points">
        <div class="points-item">
          <div class="point"></div>
          <div class="point"></div>
        </div>
        <div class="points-item">
          <div class="point"></div>
          <div class="point"></div>
        </div>
      </div>
      <div class="avatar">
        <div class="avatar-l">
          <img
            class="item-i"
            src="~@/assets/images1/head.jpg"
            alt="???"
          >
          <div>头像</div>
        </div>
        <img
          class="avatar-r"
          src=""
          alt="???"
        >
      </div>
      <div class="form-item">
        <div class="item-l">
          <img
            class="item-i"
            src="~@/assets/images1/edit.jpg"
            alt="???"
          >
          <div>会员名</div>
        </div>
        <div class="item-r">
          {{info.name}}
        </div>
      </div>
      <div class="form-item">
        <div class="item-l">
          <img
            class="item-i"
            src="~@/assets/images1/mobile.jpg"
            alt="???"
          >
          <div>手机（必填）</div>
        </div>
        <div class="item-r">
          <input v-model.number="info.mobile" type="text">
        </div>
      </div>
      <div class="form-item" @click="selDate">
        <div class="item-l">
          <img
            class="item-i"
            src="~@/assets/images1/birth.jpg"
            alt="???"
          >
          <div>生日（必填）</div>
        </div>
        <div class="item-r">{{info.birthday}}
        </div>
        <div class="item-arrow">
          <img
            src="~@/assets/images1/arrow.png"
            alt="???"
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-l">
          <img
            class="item-i"
            src="~@/assets/images1/sex.jpg"
            alt="???"
          >
          <div>性别（必填）</div>
        </div>
        <div class="item-r">
          <select v-model="info.sex" style="width: 100%">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
        <div class="item-arrow">
          <img
            src="~@/assets/images1/arrow.png"
            alt="???"
          >
        </div>
      </div>
      <div class="form-item">
        <div class="item-l">
          <img
            class="item-i"
            src="~@/assets/images1/address.jpg"
            alt="???"
          >
          <div>常驻地区（选填）</div>
        </div>
        <div
          class="item-r"
          @click="showSel"
        >
          {{address}}
        </div>
        <div class="item-arrow">
          <img
            src="~@/assets/images1/arrow.png"
            alt="???"
          >
        </div>
      </div>
      <div class="remark">*完善信息即可获得100积分</div>
    </div>
    <div class="btns">
      <div class="btn" @click="submit">保 存</div>
      <div class="btn">取 消</div>
    </div>
    <div v-show="isShowSel">
      <multi-select
        @cancel="cancel"
        @complete="complete"
        :provinces="provinces"
      ></multi-select>
    </div>
    <div v-show="1==2">
      <tips
        @cancel="cancel"
        @complete="complete"
      ></tips>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import MultiSelect from "@/components/multi-select";
import Tips from "@/components/modals/tips";
import {  queryMemberInfo, queryProvince }  from '@/api'
export default {
  name: "home",
  components: {
    MultiSelect,
    Tips
  },
  data() {
    return {
      isShowSel: false,
      provinces: [],
      address: '',
      info: {
        memberCode: '',
        name: 'leaves',
        mobile: '',
        birthday: '',
        sex: '',
        province: '',
        city: '',
        region: '',
        provinceName: '',
        cityName: '',
        regionName: '',
      }
    };
  },
  methods: {
    selDate() {
      const baseDate = moment().subtract(18, 'year').format('YYYY-MM-DD')
      this.$picker.show({
        type: "datePicker",
        date: this.info.birthday ? this.info.birthday : baseDate, //初始化时间
        endTime: baseDate, //截至时间
        startTime: "", //开始时间
        onOk: e => {
          this.info.birthday = e;
        }
      });
    },
    showSel() {
      this.isShowSel = true;
    },
    cancel() {
      this.isShowSel = false;
    },
    complete(val) {
      this.info.province = val.province.code
      this.info.city = val.city.code
      this.info.region = val.area.code
      this.address = val.province.name + val.city.name + val.area.name
      this.isShowSel = false;
    },
    submit() {
      console.log(this.info)
    }
  },
  mounted() {
    this.isShowSel = false;
    queryMemberInfo().then((res)=> {
      this.info = res.obj
    }).catch((e) => {
      console.log(e, 555)
    })
    queryProvince().then((res) => {
      this.provinces = res.obj
    }).catch((e) => {
      console.log(e, 555)
    })
  }
};
</script>

<style lang="stylus">
.home {
  background: #FFCB00;
  height: 100%;
  width: 100%;
  padding: 0 13px;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: center;
    font-size: 36px;
    font-weight: 700;
    padding: 20px 0;

    .info-i {
      width: 66px;
      height: 58px;
      margin-right: 12px;
    }

    .info {
      margin-top: 16px;
    }
  }

  .content {
    position: relative;
    background: #fff;
    border-radius: 20px;
    padding: 40px 48px;

    .points {
      position: absolute;
      top: -20px;
      left: 0;
      right: 0;
      width: 440px;
      margin: auto;
      display: flex;
      justify-content: space-between;

      .points-item {
        display: flex;

        .point {
          height: 33px;
          width: 10px;
          border: 2px solid #ffffff; /* no */
          border-radius: 7px;
          background: #FFCB00;

          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }

    .avatar {
      padding: 0px 85px 20px 85px;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #FFCB00; /* no */

      .avatar-l {
        display: flex;
        margin-top: 40px;

        img {
          width: 34px;
          height: 34px;
          margin-right: 16px;
        }

        div {
          margin-top: 4px;
          font-size: 30px;
        }
      }

      .avatar-r {
        width: 120px;
        height: 120px;
        border-radius: 8px;
        background: #E3E3E3;
      }
    }

    .form-item {
      display: flex;
      padding: 26px 0 26px 80px;
      border-bottom: 2px solid #FFCB00; /* no */
      font-size: 30px;
      position relative
      .item-l {
        width: 300px;
        display: flex;

        img {
          width: 34px;
          height: 34px;
          margin-right: 16px;
        }

        div {
          margin-top: 4px;
        }
      }

      .item-r {
        flex: 1;
        input {
          width: 100%;
          border: none;
        }
      }
      .item-arrow {
        position absolute
        right 0
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: #FFCB00;
        img {
          width: 18px;
          height: 10px;
          margin-left: 10px;
          margin-top: 16px;
        }
      }
    }

    .remark {
      font-size: 24px;
      margin-top: 34px;
      padding-left: 85px;
    }

  }
  .btns {
      margin 0 auto
      margin-top 60px
      display flex;
      justify-content space-between
      width 500px
  }
  .btn {
    border: 4px solid #f1be00;/* no */
    width: 175px;
    height: 70px;
    border-radius: 10px;
    line-height: 70px
    font-size: 36px;
    text-align center;
    background #fff
  }
}
</style>
