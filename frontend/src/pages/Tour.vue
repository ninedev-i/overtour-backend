<template>
   <div>
      <menuHeader />

      <page>
         <template #content>
            <main>
               <article>
                  <h1 class="tour_title">{{title}}</h1>
                  <div class="tour_description">
                     <!--<h3>Описание маршрута</h3>-->
                     {{description}}
                  </div>
                  <div v-if="imgArray.length">
                     <el-carousel :interval="4000" type="card" indicator-position="none" height="300px" class="tour_carousel">
                        <el-carousel-item v-for="item in imgArray" :key="item" class="tour_carousel_item">
                           <img :src="item" :alt="title" :title="title" class="tour_carousel_image">
                        </el-carousel-item>
                     </el-carousel>
                  </div>
                  <!--<div><img :src="image" :alt="title" class="tour__cover"></div>-->

                  <div class="tour_plan">
                     <!--<h3>План похода</h3>-->
                     <div v-for="(day, i) in plan" class="tour_plan_day" :key="i">
                        <div class="tour_plan_day_number">День {{i + 1}}</div>
                        <div>
                           <b class="tour_plan_day_title">{{day.title}}</b>
                           <div v-html="day.content" class="tour_plan_day_content"></div>
                        </div>
                     </div>
                  </div>
               </article>
            </main>
         </template>

         <template #sidebar>
            <a :href="link" target="_blank" rel="nofollow" class="tour_order">
               <el-button type="primary" icon="el-icon-link" class="tour_link">Пойти в поход</el-button>
            </a>
            <div class="side_block-white">
               <div><b class="tour_additional_info">Начало:</b> {{moment(date_from).format('D MMMM YYYY')}}</div>
               <div><b class="tour_additional_info">Конец:</b> {{moment(date_to).format('D MMMM YYYY')}}</div>
               <div><b class="tour_additional_info">Стоимость:</b> {{triads(price)}} ₽</div>
            </div>
         </template>
      </page>
   </div>
</template>

<script>
    import menuHeader from '~/components/Elements/Header';
    import page from '~/components/Elements/Page';

    export default {
        head() {
            return {
                title: this.title
            }
        },

        data() {
            return {
                imgArray: [
                    'https://clubstrannik.ru/uploads/days/a760d00ac4db3dd7aebac09b05c0dd89.jpg',
                    'https://clubstrannik.ru/uploads/days/aae48a9f57e4263807a1b96002de8b2d.JPG',
                    'https://clubstrannik.ru/uploads/days/3cf72bd2acf6a2ca8bf60e95e8df39ab.jpg',
                    'https://clubstrannik.ru/uploads/days/53f76785c849a1bd7dbf01111a908f3d.jpg',
                    'https://clubstrannik.ru/uploads/days/7f2b56cf085ec28e8a4899d57451710b.jpg'
                ],
                plan: [
                    {
                        title: 'Встреча участников группы порог Блюдце',
                        content: `<p>Встреча группы на железнодорожном вокзале г. Петрозаводск (подробнее в разделе "Полезная информация"). Переезд к началу сплава (~3 ч).</p><p>После прибытия к точке старта приготовим вкусный обед, подготовим снаряжение для сплава, пройдем <strong>инструктаж</strong>, упакуем вещи в гермомешки и выйдем на маршрут.</p><p><strong>Сегодня мы преодолеем пороги:</strong> Мостовой (2 категории сложности), несколько шивер. Если уровень воды в реке будет низкий, то пройти порог Мостовой нельзя будет пройти. В данном случае стартуем сразу после него.&nbsp;</p><p>Разобьем лагерь на красивой стоянке недалеко от порога Блюдце (3 к.с.).</p>`
                    },
                    {
                        title: 'Порог Блюдце порог Розовый слон',
                        content: `<p dir="ltr">
\tПосле завтрака продолжим маршрут. Нам предстоит преодолеть несколько локальных препятствий, а также довольно затяжную <strong>Лососевую шиверу</strong> (1 к.с) и дойти до <strong>порога Сирнитсанкоски (Розовый Слон)</strong>. Около него, на одной из прекраснейших стоянок, разобьем лагерь. Оставшуюся часть дня посвятим отдыху после насыщенной первой части маршрута.&nbsp;</p>`
                    },
                    {
                        title: 'Дневка на пороге Розовый слон',
                        content: `<p>
\tОтдыхаем, катаемся на порогах, вечером делаем баню.</p>
<p>
\tПожалуй, этот день у нас будет одним из самых насыщенных. Ведь перед нами отличный полигон из двух самых знаменитых порогов реки:<strong> Розовый Слон (3 к.с.) и Мельница 4 (к.с.)</strong>. Препятствия интересные и мощные при любом уровне воды. Их локальность позволяет нам обносить суда и делать несколько попыток прохождения по разным траекториям движения. Ну и конечно же&nbsp;— походная баня. А в завершении дня — вечерние посиделки у костра и обмен впечатлениями.</p>`
                    }
                ]
            }
        },

        components: {
            menuHeader,
            page,
        },

        async asyncData({params, $axios}) {
            const info = await $axios.get(`get_tour/${params.id}`);
            return await info.data;
        },
    }
</script>

<style lang="stylus">
   @import '../../assets/constants';

   .tour
      h1&_title
         padding 0 16px
         font-size 26px
      &_description
         background-color @page-background
         padding @page-padding

      &_carousel
         margin 20px 0 20px 0

         &_item
            user-select none
         &_image
            width 100%

      &_plan
         background-color @page-background
         padding @page-padding

         &_day
            display flex
            margin-bottom 20px

            &_number
               min-width 65px
               border-right 1px solid @separator-color
               margin-right 12px
            &_title
               display block
               margin-bottom 8px
            &_content
               font-size 15px

      // Сайдбар
      &_order
         width 100%
         margin-bottom 10px
      &_link
         width 100%
         background-color @main-color !important
         border 0

         &:hover
            background-color @main-color-hover !important
         &:active
            background-color @main-color-active !important
      &_additional_info
         color #cacaca
         font-weight 300
</style>
