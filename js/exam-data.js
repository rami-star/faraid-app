window.EXAM_DATA = {
    /* ========================================================================
       القسم الأول: الأسئلة النظرية المنوّعة (٣٤ سؤالاً)
       ======================================================================== */
    theory: [
      {
        id: "t1", type: "single",
        q: "ما هو تعريف علم المواريث (الفرائض)؟",
        opts: [
          "العلم بأحكام الوصايا والوقف والهبات فقط",
          "العلم بالقواعد الفقهية والحسابية التي يُتوصل بها لمعرفة نصيب كل وارث من تركة مورثه",
          "العلم بحساب الأنساب وتاريخ القبائل",
          "العلم بقسمة الأموال التجارية بين الشركاء"
        ],
        ans: 1
      },
      {
        id: "t2", type: "single",
        q: "ما الترتيب الصحيح للحقوق المتعلقة بالتركة عند الحنابلة (المجموعة في كلمة: تدوم)؟",
        opts: [
          "الديون، ثم التجهيز، ثم الميراث، ثم الوصية",
          "الوصية، ثم التجهيز، ثم الديون، ثم الميراث",
          "التجهيز، ثم الديون، ثم الوصية، ثم الميراث",
          "الميراث، ثم الديون، ثم الوصية، ثم التجهيز"
        ],
        ans: 2
      },
      {
        id: "t3", type: "multi",
        q: "ما هي موانع الإرث المتفق عليها؟",
        opts: ["الرق", "المرض والفقر", "القتل", "اختلاف الدين"],
        ans: [0, 2, 3]
      },
      {
        id: "t4", type: "multi",
        q: "أي من أصول المسائل التالية يدخلها العول؟",
        opts: ["٤", "٦", "١٢", "٢٤", "٨"],
        ans: [1, 2, 3]
      },
      {
        id: "t5", type: "tf",
        q: "من قواعد الحجب أن كل من أدلى إلى الميت بواسطة حجبته تلك الواسطة، ويُستثنى من ذلك أولاد الأم.",
        opts: ["صح", "خطأ"],
        ans: 0
      },
      {
        id: "t6", type: "multi",
        q: "متى تكون الوصية محرمة؟",
        opts: [
          "إذا كانت لوارث بغير إجازة بقية الورثة",
          "إذا كانت لفقير غير وارث بأقل من الثلث",
          "إذا كانت بأكثر من الثلث بغير إجازة الورثة",
          "إذا كانت بقصد الإضرار بالورثة"
        ],
        ans: [0, 2, 3]
      },
      {
        id: "t7", type: "single",
        q: "ما صورة المسألتين الغراوين (العُمَريتين)، ومن الذي قضى بهما؟",
        opts: [
          "زوج وأم وجد وأخت شقيقة — زيد بن ثابت رضي الله عنه",
          "زوج وأم وإخوة لأم وإخوة أشقاء — علي رضي الله عنه",
          "أحد الزوجين مع أم وأب — عمر بن الخطاب رضي الله عنه",
          "زوجة وبنتان وأب وأم — ابن عباس رضي الله عنه"
        ],
        ans: 2
      },
      {
        id: "t8", type: "single",
        q: "كم عدد جهات العصبة بالنفس عند أبي حنيفة رحمه الله؟",
        opts: [
          "ست جهات (البنوة، الأبوة، الجدودة، الأخوة، العمومة، الولاء)",
          "أربع جهات (البنوة، ثم الأبوة ويدخل فيها الجد، ثم الأخوة، ثم العمومة)",
          "جهتان فقط (البنوة والأبوة)",
          "ثلاث جهات (البنوة والأخوة والعمومة)"
        ],
        ans: 1
      },
      {
        id: "t9", type: "single",
        q: "ما هي صورة المسألة المشتركة، وما هي صورة المسألة الأكدرية؟",
        opts: [
          "المشتركة: زوج وأم وأب — والأكدرية: زوجة وأم وأب",
          "المشتركة: بنتان وأم وأب — والأكدرية: زوج وبنت وأخت شقيقة",
          "المشتركة: زوجة وجد وإخوة — والأكدرية: أم وجد وإخوة لأم",
          "المشتركة: زوج وأم وإخوة لأم وإخوة أشقاء — والأكدرية: زوج وأم وجد وأخت لغير أم"
        ],
        ans: 3
      },
      {
        id: "t10", type: "tf",
        q: "ذوو الأرحام هم كل قريب للميت ليس بذي فرض ولا عصبة.",
        opts: ["صح", "خطأ"],
        ans: 0
      },
      {
        id: "t11", type: "multi",
        q: "إذا اجتمع جميع الذكور الخمسة عشر، فمن الذين يرثون منهم؟",
        opts: ["الابن", "الجد", "الأب", "الأخ الشقيق", "الزوج"],
        ans: [0, 2, 4]
      },
      {
        id: "t12", type: "single",
        q: "ما هو تعريف المناسخات في علم الفرائض؟",
        opts: [
          "اجتماع الحمل والخنثى في مسألة واحدة",
          "موت وارث أو أكثر قبل قسمة تركة الميت الأول",
          "عول المسألة أكثر من مرة",
          "رد الباقي على الزوجين"
        ],
        ans: 1
      },
      {
        id: "t13", type: "multi",
        q: "إذا اجتمع جميع النساء العشر، فمن اللواتي يرثن منهن؟",
        opts: ["البنت", "بنت الابن", "الأم", "الزوجة", "الأخت الشقيقة", "الجدة"],
        ans: [0, 1, 2, 3, 4]
      },
      {
        id: "t14", type: "single",
        q: "كم عدد أصحاب فرض النصف (١/٢)؟",
        opts: ["ثلاثة", "أربعة", "خمسة", "ستة"],
        ans: 2
      },
      {
        id: "t15", type: "tf",
        q: "تستحق الزوجة (أو الزوجات) فرض الثمن (١/٨) عند عدم وجود الفرع الوارث للزوج.",
        opts: ["صح", "خطأ"],
        ans: 1
      },
      {
        id: "t16", type: "multi",
        q: "ما الشروط التي إذا تحققت أخذت الأم الثلث (١/٣) كاملاً؟",
        opts: [
          "عدم وجود الفرع الوارث",
          "عدم وجود الجمع من الإخوة",
          "ألا تكون المسألة إحدى الغراوين",
          "عدم وجود الزوج"
        ],
        ans: [0, 1, 2]
      },
      {
        id: "t17", type: "tf",
        q: "يرث الإخوة لأم بالتعصيب للذكر مثل حظ الأنثيين.",
        opts: ["صح", "خطأ"],
        ans: 1
      },
      {
        id: "t18", type: "multi",
        q: "من اللواتي يصرن عصبة مع الغير؟",
        opts: [
          "الأخت الشقيقة مع البنت أو بنت الابن",
          "الأخت لأب مع البنت أو بنت الابن",
          "البنت مع الابن",
          "الأخت لأم مع البنت"
        ],
        ans: [0, 1]
      },
      {
        id: "t19", type: "single",
        q: "في باب الجد مع الإخوة، إذا لم يكن معهما صاحب فرض، فما الخياران اللذان يُعطى الجد الأحظ منهما؟",
        opts: [
          "السدس أو ثلث الباقي",
          "المقاسمة أو ثلث جميع المال (١/٣)",
          "النصف أو الربع",
          "المقاسمة أو السدس فقط"
        ],
        ans: 1
      },
      {
        id: "t20", type: "tf",
        q: "يعول أصل المسألة (٢٤) مرة واحدة إلى (٢٧) فقط.",
        opts: ["صح", "خطأ"],
        ans: 0
      },
      {
        id: "t21", type: "multi",
        q: "ما هي الأعداد التي يعول إليها أصل المسألة (١٢)؟",
        opts: ["١٣", "١٤", "١٥", "١٧"],
        ans: [0, 2, 3]
      },
      {
        id: "t22", type: "tf",
        q: "يُردّ الباقي من التركة على أحد الزوجين في مذهب الجمهور.",
        opts: ["صح", "خطأ"],
        ans: 1
      },
      {
        id: "t23", type: "single",
        q: "في باب تصحيح الانكسار، إذا كانت السهام والرؤوس متباينة، فماذا نأخذ كجزء سهم؟",
        opts: ["وفق عدد الرؤوس", "كامل عدد السهام", "كامل عدد الرؤوس", "مجموع السهام والرؤوس"],
        ans: 2
      },
      {
        id: "t24", type: "multi",
        q: "ما هي النسب الأربع المستعملة في النظر بين الرؤوس والمقامات؟",
        opts: ["المماثلة", "المداخلة", "الموافقة", "المباينة", "المقاسمة"],
        ans: [0, 1, 2, 3]
      },
      {
        id: "t25", type: "tf",
        q: "يُعطى الورثة مع وجود الحمل الأقل (الأضر) من التقديرات، ويُوقف الباقي حتى يولد الحمل.",
        opts: ["صح", "خطأ"],
        ans: 0
      },
      {
        id: "t26", type: "single",
        q: "كيف يُورّث الخنثى المشكل الذي لا يُرجى اتضاح حاله عند الحنابلة؟",
        opts: [
          "يُعطى الأضر فقط ويُوقف الباقي للأبد",
          "يُعطى نصف ميراث ذكر ونصف ميراث أنثى (العمل بالحالين)",
          "يُعطى نصيب الذكر كاملاً دائماً",
          "لا يرث شيئاً"
        ],
        ans: 1
      },
      {
        id: "t27", type: "tf",
        q: "في مسألة المفقود يُعدّ ميتاً فوراً ولا يُوقف له شيء من تركة مورثه.",
        opts: ["صح", "خطأ"],
        ans: 1
      },
      {
        id: "t28", type: "single",
        q: "ما حكم توارث الغرقى والهدمى إذا جُهل السابق منهما موتاً عند الجمهور؟",
        opts: [
          "يرث كل واحد منهما من تلاد مال الآخر",
          "يرث الأكبر سناً من الأصغر فقط",
          "لا يرث أحدهما من الآخر، ويُقسم مال كل واحد على ورثته الأحياء فقط",
          "يرث الأصغر سناً من الأكبر فقط"
        ],
        ans: 2
      },
      {
        id: "t29", type: "tf",
        q: "عند الحنابلة يرث الغرقى والهدمى بعضهم من تلاد مال الآخر بشرط عدم التداعي.",
        opts: ["صح", "خطأ"],
        ans: 0
      },
      {
        id: "t30", type: "single",
        q: "إذا أوصى شخص لأجنبي بأكثر من الثلث ولم يُجز الورثة الزيادة، فما الحكم؟",
        opts: [
          "تبطل الوصية بالكامل",
          "تُنفّذ الوصية كاملة رغم رفض الورثة",
          "تُردّ إلى الربع (١/٤)",
          "تُردّ الوصية إلى الثلث (١/٣) فقط"
        ],
        ans: 3
      },
      {
        id: "t31", type: "tf",
        q: "الوارث المحجوب حجب حرمان لا يؤثر في غيره أبداً مثل الممنوع من الإرث.",
        opts: ["صح", "خطأ"],
        ans: 1
      },
      {
        id: "t32", type: "single",
        q: "كم عدد القيراط في قسمة التركات المتعارف عليها في علم الفرائض؟",
        opts: ["١٢ قيراطاً", "٢٤ قيراطاً", "١٠٠ قيراط", "١٦ قيراطاً"],
        ans: 1
      },
      {
        id: "t33", type: "multi",
        q: "من هم الورثة الذين يرثون بالفرض والتعصيب معاً في مسألة واحدة؟",
        opts: ["الأب", "الابن", "الجد (أبو الأب وإن علا)", "الزوج"],
        ans: [0, 2]
      },
      {
        id: "t34", type: "tf",
        q: "في مذهب أهل التنزيل في توريث ذوي الأرحام يُنزّل كل فرع منزلة أصله الذي يدلي به إلى الميت.",
        opts: ["صح", "خطأ"],
        ans: 0
      }
    ],
  
    /* الدفعات القادمة ستملأ هذه الأقسام الثلاثة (٦٦ مسألة عملية) */
    /* ========================================================================
     القسم الثاني: مسائل الفروض والعول والرد والانكسار والجد والأرحام (٣٨ مسألة)
     ======================================================================== */
  basic: [
    {
      id: "s10",
      title: "(س١٠) ابن ابن أخ ش للمعتق / خال.",
      cols: 1,
      heirs: ["ابن ابن أخ ش للمعتق", "خال"],
      expectedOrigin: 1,
      expectedShares: [1, 0]
    },
    {
      id: "s13",
      title: "(س١٣) زوجة / أخت ش / بنت أخ ش.",
      cols: 1,
      heirs: ["زوجة", "أخت ش", "بنت أخ ش"],
      expectedOrigin: 4,
      expectedShares: [1, 3, 0]
    },
    {
      id: "s14",
      title: "(س١٤) بنت / بنت ابن / ابن أخ ش / بنت أخ ش.",
      cols: 1,
      heirs: ["بنت", "بنت ابن", "ابن أخ ش", "بنت أخ ش"],
      expectedOrigin: 6,
      expectedShares: [3, 1, 2, 0]
    },
    {
      id: "s16",
      title: "(س١٦) زوج / أم / جد / أخت ش / ابن ابن أخ ش.",
      cols: 2, awlCol: 0,
      colHeaders: ["الأصل / العول", "الجامعة"],
      heirs: ["زوج", "أم", "جد", "أخت ش", "ابن ابن أخ ش"],
      expectedOrigin: 27,
      expectedShares: [9, 6, 8, 4, 0]
    },
    {
      id: "s17",
      title: "(س١٧) زوجة / ٤ بنت / ابن ابن أخ ش / ابن أخ لأب.",
      cols: 1,
      heirs: ["زوجة", "٤ بنت", "ابن ابن أخ ش", "ابن أخ لأب"],
      expectedOrigin: 24,
      expectedShares: [3, 16, 0, 5]
    },
    {
      id: "s20",
      title: "(س٢٠) بنت بنت / بنت بنت ابن / عمة لأم / خالة ش / خالة لأم / خال لأب (أهل التنزيل).",
      cols: 2,
      colHeaders: ["أصل التنزيل", "الجامعة"],
      heirs: ["بنت بنت", "بنت بنت ابن", "عمة لأم", "خالة ش", "خالة لأم", "خال لأب"],
      expectedOrigin: 36,
      expectedShares: [18, 6, 6, 3, 1, 2]
    },
    {
      id: "s23",
      title: "(س٢٣) زوجة / أخت ش / بنت أخت لأب / أخ لأم.",
      cols: 2,
      colHeaders: ["الزوجية", "الجامعة"],
      heirs: ["زوجة", "أخت ش", "بنت أخت لأب", "أخ لأم"],
      expectedOrigin: 16,
      expectedShares: [4, 9, 0, 3]
    },
    {
      id: "s24",
      title: "(س٢٤) زوجة / ابن للمعتق / بنت للمعتق.",
      cols: 1,
      heirs: ["زوجة", "ابن للمعتق", "بنت للمعتق"],
      expectedOrigin: 4,
      expectedShares: [1, 3, 0]
    },
    {
      id: "s25",
      title: "(س٢٥) أب أم / خال / عمة.",
      cols: 1,
      heirs: ["أب أم", "خال", "عمة"],
      expectedOrigin: 3,
      expectedShares: [1, 0, 2]
    },
    {
      id: "s26",
      title: "(س٢٦) زوج / بنت / بنت ابن / ابن أخت لأم / ابن أخت ش / ابن ابن عم لأب للمعتق.",
      cols: 1,
      heirs: ["زوج", "بنت", "بنت ابن", "ابن أخت لأم", "ابن أخت ش", "ابن ابن عم لأب للمعتق"],
      expectedOrigin: 12,
      expectedShares: [3, 6, 2, 0, 0, 1]
    },
    {
      id: "s29",
      title: "(س٢٩) زوج / أم / ٤ إخوة لأم / أخت ش.",
      cols: 2, awlCol: 0,
      colHeaders: ["الأصل / العول", "التصحيح"],
      heirs: ["زوج", "أم", "٤ إخوة لأم", "أخت ش"],
      expectedOrigin: 18,
      expectedShares: [6, 2, 4, 6]
    },
    {
      id: "s30",
      title: "(س٣٠) بنت ابن / بنت ابن ابن / ابن أخ لأم / بنت أخ لأم / أم أب أم.",
      cols: 2,
      colHeaders: ["الأصل", "الرد"],
      heirs: ["بنت ابن", "بنت ابن ابن", "ابن أخ لأم", "بنت أخ لأم", "أم أب أم"],
      expectedOrigin: 4,
      expectedShares: [3, 1, 0, 0, 0]
    },
    {
      id: "s32",
      title: "(س٣٢) زوجة / بنت بنت / بنت أخت ش / بنت أخت لأب.",
      cols: 2,
      colHeaders: ["الزوجية", "الجامعة"],
      heirs: ["زوجة", "بنت بنت", "بنت أخت ش", "بنت أخت لأب"],
      expectedOrigin: 8,
      expectedShares: [2, 3, 3, 0]
    },
    {
      id: "s33",
      title: "(س٣٣) زوج / أم / أخ لأم / أخت لأم / بنت.",
      cols: 2,
      colHeaders: ["الزوجية", "الجامعة"],
      heirs: ["زوج", "أم", "أخ لأم", "أخت لأم", "بنت"],
      expectedOrigin: 16,
      expectedShares: [4, 3, 0, 0, 9]
    },
    {
      id: "s35",
      title: "(س٣٥) ١٠ بنت / بنت ابن / ابن ابن أخ لأم.",
      cols: 1,
      heirs: ["١٠ بنت", "بنت ابن", "ابن ابن أخ لأم"],
      expectedOrigin: 10,
      expectedShares: [10, 0, 0]
    },
    {
      id: "s36",
      title: "(س٣٦) ٤ بنت / بنت ابن / بنت ابن ابن / بنت ابن ابن ابن / ابن ابن ابن ابن.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٤ بنت", "بنت ابن", "بنت ابن ابن", "بنت ابن ابن ابن", "ابن ابن ابن ابن"],
      expectedOrigin: 30,
      expectedShares: [20, 2, 2, 2, 4]
    },
    {
      id: "s38",
      title: "(س٣٨) زوج / أخ ش للمعتق / أخت ش للمعتق.",
      cols: 1,
      heirs: ["زوج", "أخ ش للمعتق", "أخت ش للمعتق"],
      expectedOrigin: 2,
      expectedShares: [1, 1, 0]
    },
    {
      id: "s39",
      title: "(س٣٩) زوجة / ٦ أخ لأم / بنت / عم ش للأب.",
      cols: 1,
      heirs: ["زوجة", "٦ أخ لأم", "بنت", "عم ش للأب"],
      expectedOrigin: 8,
      expectedShares: [1, 0, 4, 3]
    },
    {
      id: "s40",
      title: "(س٤٠) زوج / أخت ش / أخت لأب / أخ لأب.",
      cols: 1,
      heirs: ["زوج", "أخت ش", "أخت لأب", "أخ لأب"],
      expectedOrigin: 2,
      expectedShares: [1, 1, 0, 0]
    },
    {
      id: "s41",
      title: "(س٤١) زوج / بنت / بنت ابن / ابن ابن / أب / أم.",
      cols: 1, awlCol: 0,
      colHeaders: ["الأصل / العول"],
      heirs: ["زوج", "بنت", "بنت ابن", "ابن ابن", "أب", "أم"],
      expectedOrigin: 13,
      expectedShares: [3, 6, 0, 0, 2, 2]
    },
    {
      id: "s42",
      title: "(س٤٢) زوجة / بنت / ابن أخ لأم / بنت أخ لأم.",
      cols: 1,
      heirs: ["زوجة", "بنت", "ابن أخ لأم", "بنت أخ لأم"],
      expectedOrigin: 8,
      expectedShares: [1, 7, 0, 0]
    },
    {
      id: "s43",
      title: "(س٤٣) ٣ بنت / زوج / ٤ أخت ش / أخ لأب.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٣ بنت", "زوج", "٤ أخت ش", "أخ لأب"],
      expectedOrigin: 144,
      expectedShares: [96, 36, 12, 0]
    },
    {
      id: "s44",
      title: "(س٤٤) بنت أخت ش / بنت أخت لأب / ابن أخ لأم / ابن ابن ابن أخ ش للمعتقة.",
      cols: 1,
      heirs: ["بنت أخت ش", "بنت أخت لأب", "ابن أخ لأم", "ابن ابن ابن أخ ش للمعتقة"],
      expectedOrigin: 1,
      expectedShares: [0, 0, 0, 1]
    },
    {
      id: "s51",
      title: "(س٥١) زوج / جد / ٢ أخت ش / أخ لأب.",
      cols: 1,
      heirs: ["زوج", "جد", "٢ أخت ش", "أخ لأب"],
      expectedOrigin: 6,
      expectedShares: [3, 1, 2, 0]
    },
    {
      id: "s52",
      title: "(س٥٢) ٩ بنت / أم أم أم / أم أب / أخت ش.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٩ بنت", "أم أم أم", "أم أب", "أخت ش"],
      expectedOrigin: 54,
      expectedShares: [36, 0, 9, 9]
    },
    {
      id: "s55",
      title: "(س٥٥) مسألة الامتحان: ٤ زوجات / ٥ جدات / ٧ بنت / ٩ عم ش.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٤ زوجات", "٥ جدات", "٧ بنت", "٩ عم ش"],
      expectedOrigin: 30240,
      expectedShares: [3780, 5040, 20160, 1260]
    },
    {
      id: "s56",
      title: "(س٥٦) زوجة / أخت ش / ابن بنت للمعتق.",
      cols: 1,
      heirs: ["زوجة", "أخت ش", "ابن بنت للمعتق"],
      expectedOrigin: 4,
      expectedShares: [1, 3, 0]
    },
    {
      id: "s58",
      title: "(س٥٨) زوج / أم / جد / أخت ش / أخت لأب.",
      cols: 1,
      heirs: ["زوج", "أم", "جد", "أخت ش", "أخت لأب"],
      expectedOrigin: 6,
      expectedShares: [3, 1, 1, 1, 0]
    },
    {
      id: "s60",
      title: "(س٦٠) زوجة / بنت / ٦ بنت ابن / ابن أخ لأم.",
      cols: 3,
      colHeaders: ["الزوجية", "الرد والتصحيح", "الجامعة"],
      heirs: ["زوجة", "بنت", "٦ بنت ابن", "ابن أخ لأم"],
      expectedOrigin: 192,
      expectedShares: [24, 126, 42, 0]
    },
    {
      id: "s61",
      title: "(س٦١) زوج / أم / ابن أخ ش / جد / أخت ش.",
      cols: 3,
      colHeaders: ["الأصل", "العول", "الجامعة"],
      heirs: ["زوج", "أم", "ابن أخ ش", "جد", "أخت ش"],
      expectedOrigin: 27,
      expectedShares: [9, 6, 0, 8, 4]
    },
    {
      id: "s62",
      title: "(س٦٢) ٦ جدات / ٩ بنت / ٣ بنت ابن / ١٥ عم ش للأب.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٦ جدات", "٩ بنت", "٣ بنت ابن", "١٥ عم ش للأب"],
      expectedOrigin: 540,
      expectedShares: [90, 360, 0, 90]
    },
    {
      id: "s63",
      title: "(س٦٣) زوجة / جد / أخت ش / أخ لأم / أخ لأب.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["زوجة", "جد", "أخت ش", "أخ لأم", "أخ لأب"],
      expectedOrigin: 20,
      expectedShares: [5, 6, 9, 0, 0]
    },
    {
      id: "s75",
      title: "(س٧٥) ابن ابن أخت ش / ابن خال / ابن عمة / بنت المعتق.",
      cols: 1,
      heirs: ["ابن ابن أخت ش", "ابن خال", "ابن عمة", "بنت المعتق"],
      expectedOrigin: 3,
      expectedShares: [0, 1, 2, 0]
    },
    {
      id: "s76",
      title: "(س٧٦) أم / ابن أخ ش / أخ لأب / أبو أبي الأب.",
      cols: 2,
      colHeaders: ["الأصل", "المقاسمة"],
      heirs: ["أم", "ابن أخ ش", "أخ لأب", "أبو أبي الأب"],
      expectedOrigin: 12,
      expectedShares: [2, 0, 5, 5]
    },
    {
      id: "s77",
      title: "(س٧٧) ٤ زوجة / أم / جد / أب / جدة / أخت ش / عم لأب للجد.",
      cols: 2,
      colHeaders: ["الأصل", "التصحيح"],
      heirs: ["٤ زوجة", "أم", "جد", "أب", "جدة", "أخت ش", "عم لأب للجد"],
      expectedOrigin: 16,
      expectedShares: [4, 4, 0, 8, 0, 0, 0]
    },
    {
      id: "s79",
      title: "(س٧٩) زوجة / بنت / بنت ابن ابن ابن ابن / عم ش للجد / ابن ابن عم ش للأب.",
      cols: 1,
      heirs: ["زوجة", "بنت", "بنت ابن ابن ابن ابن", "عم ش للجد", "ابن ابن عم ش للأب"],
      expectedOrigin: 24,
      expectedShares: [3, 12, 4, 0, 5]
    },
    {
      id: "s80",
      title: "(س٨٠) زوجة / بنت بنت / ابن بنت / ابن أخ لأم / ابن ابن ابن عم لأب للجد.",
      cols: 1,
      heirs: ["زوجة", "بنت بنت", "ابن بنت", "ابن أخ لأم", "ابن ابن ابن عم لأب للجد"],
      expectedOrigin: 4,
      expectedShares: [1, 0, 0, 0, 3]
    },
    {
      id: "s82",
      title: "(س٨٢) بنت بنت / ابن أخت ش / ابن أخ لأم.",
      cols: 1,
      heirs: ["بنت بنت", "ابن أخت ش", "ابن أخ لأم"],
      expectedOrigin: 2,
      expectedShares: [1, 1, 0]
    }
  ],
  /* ========================================================================
  القسم الثالث: التقديرات، ذوو الأرحام (التنزيل)، التركات والوصايا (١٩ مسألة)
  ======================================================================== */
special: [
 // --- ١) مسائل الحمل (٣ مسائل — بهيكل تقسيم الموقوف) ---
 {
   id: "sp1",
   type: "estimation",
   title: "مسألة الحمل عند الحنفية: أب / أم / حمل (زوجة ابن).",
   heirs: ["أب", "أم", "الحمل (زوجة ابن)"],
   cases: ["ميت", "ذكر", "أنثى"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [2, 1, 1],
   expectedOrigs: [3, 6, 6],
   expectedCaseShares: [
     [2, 1, 2],
     [1, 1, 1],
     [0, 4, 3]
   ],
   expectedJam: 6,
   expectedJamShares: [1, 1, 0],
   expectedMawqoof: 4,
   expectedMawqoofShares: [
     [3, 0, 1],
     [1, 0, 0],
     [0, 4, 3]
   ]
 },
 {
   id: "sp2",
   type: "estimation",
   title: "مسألة الحمل: زوج / أم / عم شقيق / حمل (ولد الميت).",
   heirs: ["زوج", "أم", "عم شقيق", "الحمل (ولد الميت)"],
   cases: ["ميت", "ذكر", "أنثى"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [2, 1, 1],
   expectedOrigs: [6, 12, 12],
   expectedCaseShares: [
     [3, 3, 3],
     [2, 2, 2],
     [1, 0, 1],
     [0, 7, 6]
   ],
   expectedJam: 12,
   expectedJamShares: [3, 2, 0, 0],
   expectedMawqoof: 7,
   expectedMawqoofShares: [
     [3, 0, 0],
     [2, 0, 0],
     [2, 0, 1],
     [0, 7, 6]
   ]
 },
 {
   id: "sp3",
   type: "estimation",
   title: "مسألة الحمل: بنت / أخ شقيق / حمل (ولد الميت).",
   heirs: ["بنت", "أخ شقيق", "الحمل (ولد الميت)"],
   cases: ["ميت", "ذكر", "أنثى"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [3, 2, 2],
   expectedOrigs: [2, 3, 3],
   expectedCaseShares: [
     [1, 1, 1],
     [1, 0, 1],
     [0, 2, 1]
   ],
   expectedJam: 6,
   expectedJamShares: [2, 0, 0],
   expectedMawqoof: 4,
   expectedMawqoofShares: [
     [1, 0, 0],
     [3, 0, 2],
     [0, 4, 2]
   ]
 },

 // --- ٢) مسائل المفقود (٤ مسائل) ---
 {
   id: "sp4",
   type: "estimation",
   title: "مسألة المفقود: زوجة / أم / أخ شقيق (مفقود) / عم شقيق.",
   heirs: ["زوجة", "أم", "أخ شقيق (مفقود)", "عم شقيق"],
   cases: ["حي", "ميت"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [1, 1],
   expectedOrigs: [12, 12],
   expectedCaseShares: [
     [3, 3],
     [4, 4],
     [5, 0],
     [0, 5]
   ],
   expectedJam: 12,
   expectedJamShares: [3, 4, 0, 0],
   expectedMawqoof: 5,
   expectedMawqoofShares: [
     [0, 0],
     [0, 0],
     [5, 0],
     [0, 5]
   ]
 },
 {
   id: "sp5",
   type: "estimation",
   title: "مسألة المفقود: زوج / أخت شقيقة / أخ شقيق (مفقود).",
   heirs: ["زوج", "أخت شقيقة", "أخ شقيق (مفقود)"],
   cases: ["حي", "ميت"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [1, 3],
   expectedOrigs: [6, 2],
   expectedCaseShares: [
     [3, 1],
     [1, 1],
     [2, 0]
   ],
   expectedJam: 6,
   expectedJamShares: [3, 1, 0],
   expectedMawqoof: 2,
   expectedMawqoofShares: [
     [0, 0],
     [0, 2],
     [2, 0]
   ]
 },
 {
   id: "sp6",
   type: "estimation",
   title: "مسألة المفقود: بنت / ابن (مفقود) / عم شقيق.",
   heirs: ["بنت", "ابن (مفقود)", "عم شقيق"],
   cases: ["حي", "ميت"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [2, 3],
   expectedOrigs: [3, 2],
   expectedCaseShares: [
     [1, 1],
     [2, 0],
     [0, 1]
   ],
   expectedJam: 6,
   expectedJamShares: [2, 0, 0],
   expectedMawqoof: 4,
   expectedMawqoofShares: [
     [0, 1],
     [4, 0],
     [0, 3]
   ]
 },
 {
   id: "sp7",
   type: "estimation",
   title: "مسألة المفقود: زوجة / بنت / أخ شقيق (مفقود) / أخ لأب.",
   heirs: ["زوجة", "بنت", "أخ شقيق (مفقود)", "أخ لأب"],
   cases: ["حي", "ميت"],
   hasMawqoofSplit: true,
   hasMawqoofFooter: true,
   expectedJs: [1, 1],
   expectedOrigs: [8, 8],
   expectedCaseShares: [
     [1, 1],
     [4, 4],
     [3, 0],
     [0, 3]
   ],
   expectedJam: 8,
   expectedJamShares: [1, 4, 0, 0],
   expectedMawqoof: 3,
   expectedMawqoofShares: [
     [0, 0],
     [0, 0],
     [3, 0],
     [0, 3]
   ]
 },

 // --- ٣) مسائل الخنثى المشكل (٣ مسائل — على هيكل س٣٧ المعتمد) ---
 {
   id: "sp8",
   type: "estimation",
   title: "(س٣٧) زوج / أم / ولد ابن خنثى.",
   heirs: ["زوج", "أم", "ولد ابن (خنثى)"],
   cases: ["ذكر", "أنثى"],
   hasMawqoofSplit: false,
   hasMawqoofFooter: true,
   expectedJs: [4, 3],
   expectedOrigs: [12, 16],
   expectedCaseShares: [
     [3, 4],
     [2, 3],
     [7, 9]
   ],
   expectedJam: 48,
   expectedJamShares: [12, 8, 27],
   expectedMawqoof: 1
 },
 {
   id: "sp9",
   type: "estimation",
   title: "مسألة الخنثى المشكل: أم / أب / ولد خنثى مشكل.",
   heirs: ["أم", "أب", "ولد (خنثى)"],
   cases: ["ذكر", "أنثى"],
   hasMawqoofSplit: false,
   hasMawqoofFooter: true,
   expectedJs: [1, 1],
   expectedOrigs: [6, 6],
   expectedCaseShares: [
     [1, 1],
     [1, 2],
     [4, 3]
   ],
   expectedJam: 6,
   expectedJamShares: [1, 1, 3],
   expectedMawqoof: 1
 },
 {
   id: "sp10",
   type: "estimation",
   title: "مسألة الخنثى المشكل: زوجة / أخ لأب / ولد خنثى مشكل.",
   heirs: ["زوجة", "أخ لأب", "ولد (خنثى)"],
   cases: ["ذكر", "أنثى"],
   hasMawqoofSplit: false,
   hasMawqoofFooter: true,
   expectedJs: [1, 1],
   expectedOrigs: [8, 8],
   expectedCaseShares: [
     [1, 1],
     [0, 3],
     [7, 4]
   ],
   expectedJam: 8,
   expectedJamShares: [1, 0, 4],
   expectedMawqoof: 3
 },

 // --- ٤) ذوو الأرحام بطريقة أهل التنزيل (س٢٠) ---
 {
   id: "sp11",
   type: "tanzil",
   title: "(س٢٠) بنت بنت / بنت بنت ابن / عمة لأم / عمة لأب / خالة ش / خالة لأم / خال لأب، حل بطريقة أهل التنزيل الشافعية.",
   expectedOrigin: 72,
   rows: [
     { heir: "خال لأب", tanzil: "أم", tanzilSpan: 3, share: 4 },
     { heir: "خالة شقيقة", share: 6 },
     { heir: "خالة لأم", share: 2 },
     { heir: "بنت بنت", tanzil: "بنت", tanzilSpan: 1, share: 36 },
     { heir: "بنت بنت ابن", tanzil: "بنت ابن", tanzilSpan: 1, share: 12 },
     { heir: "عمة لأب", tanzil: "أب", tanzilSpan: 2, share: 9 },
     { heir: "عمة لأم", share: 3 }
   ]
 },

 // --- ٥) قسمة التركات والوصايا (٨ مسائل) ---
 {
   id: "sp12",
   title: "قسمة التركة: زوجة / بنت / أخ شقيق — والتركة ٢٤,٠٠٠ درهم.",
   cols: 1,
   heirs: ["زوجة", "بنت", "أخ شقيق"],
   expectedOrigin: 8,
   expectedShares: [1, 4, 3],
   extraCol: { expectedTotal: 24000, expected: [3000, 12000, 9000] }
 },
 {
   id: "sp13",
   title: "قسمة التركة: زوج / أم / ابن — والتركة ٣٦,٠٠٠ ريال.",
   cols: 1,
   heirs: ["زوج", "أم", "ابن"],
   expectedOrigin: 12,
   expectedShares: [3, 2, 7],
   extraCol: { expectedTotal: 36000, expected: [9000, 6000, 21000] }
 },
 {
   id: "sp14",
   title: "قسمة التركة (عول): زوجة / بنتان / أم / أب — والتركة ٢٧,٠٠٠ دينار.",
   cols: 1,
   awlCol: 0,
   expectedOldOrigin: 24,
   heirs: ["زوجة", "بنتان", "أم", "أب"],
   expectedOrigin: 27,
   expectedShares: [3, 16, 4, 4],
   extraCol: { expectedTotal: 27000, expected: [3000, 16000, 4000, 4000] }
 },
 {
   id: "sp15",
   title: "قسمة التركة (عول): زوج / أخت شقيقة / أخت لأم — والتركة ٧٠,٠٠٠ ريال.",
   cols: 1,
   awlCol: 0,
   expectedOldOrigin: 6,
   heirs: ["زوج", "أخت شقيقة", "أخت لأم"],
   expectedOrigin: 7,
   expectedShares: [3, 3, 1],
   extraCol: { expectedTotal: 70000, expected: [30000, 30000, 10000] }
 },
 {
   id: "sp16",
   title: "قسمة التركة بالقيراط (٢٤ قيراطاً): زوجة / بنت / عم شقيق.",
   cols: 1,
   heirs: ["زوجة", "بنت", "عم شقيق"],
   expectedOrigin: 8,
   expectedShares: [1, 4, 3],
   extraCol: { expectedTotal: 24, expected: [3, 12, 9] }
 },
 {
   id: "sp17",
   title: "قسمة التركة بالنسبة المئوية (١٠٠٪): زوج / بنت / أخ لأب.",
   cols: 1,
   heirs: ["زوج", "بنت", "أخ لأب"],
   expectedOrigin: 4,
   expectedShares: [1, 2, 1],
   extraCol: { expectedTotal: 100, expected: [25, 50, 25] }
 },
 {
   id: "sp18",
   title: "قسمة عقار مساحته ٢,٤٠٠ م٢: زوجة / أب / أم / ابن.",
   cols: 1,
   heirs: ["زوجة", "أب", "أم", "ابن"],
   expectedOrigin: 24,
   expectedShares: [3, 4, 4, 13],
   extraCol: { expectedTotal: 2400, expected: [300, 400, 400, 1300] }
 },
 {
   id: "sp19",
   title: "مسألة وصية: أوصى لفقير بثلث ماله (١/٣)، ومات عن: زوجة / ابن — والتركة ٢٤,٠٠٠ ريال.",
   cols: 2,
   heirs: ["موصى له (١/٣)", "زوجة", "ابن"],
   expectedOrigin: 12,
   expectedShares: [4, 1, 7],
   extraCol: { expectedTotal: 24000, expected: [8000, 2000, 14000] }
 }
],

/* ========================================================================
  القسم الرابع: المناسخات (٥ مسائل معتمدة من الكتاب بفحص كامل لكل خلية)
  ======================================================================== */
munasakhat: [
 {
   id: "m88",
   type: "munasakha",
   title: "(س٨٨) مات عن: أم، وأخ لأم، وأخت لأب، وأخت ش، وزوجة؛ ثم توفيت الأم عن أب وأم ومن سبق، ثم الأخ لأم عن بنت ومن سبق، ثم الأخت لأب عن زوج وبنتين ومن سبق، ثم الأخت ش عن زوج وابن وبنت ومن سبق.",
   firstJs: 9,
   firstSplitOrigin: true,
   firstOldOrigin: 12,
   firstOrigin: 15,
   rows: [
     { name: "أم", firstShare: 2 },
     { name: "أخ لأم", firstShare: 2 },
     { name: "أخت لأب", firstShare: 2 },
     { name: "أخت ش", firstShare: 6 },
     { name: "زوجة", firstShare: 3 },
     { name: "أب", startDeath: 0 },
     { name: "أم", startDeath: 0 },
     { name: "بنت", startDeath: 1 },
     { name: "زوج", startDeath: 2 },
     { name: "بنت ١", startDeath: 2 },
     { name: "بنت ٢", startDeath: 2 },
     { name: "زوج", startDeath: 3 },
     { name: "ابن", startDeath: 3 },
     { name: "بنت", startDeath: 3 }
   ],
   deaths: [
     {
       deadRow: 0, deadTag: "ت (٢)", splitOrigin: false,
       js: 1, origin: 18,
       subShares: { 1: 8, 3: 4, 5: 3, 6: 3 },
       jamJs: 2, jam: 135,
       jamShares: { 1: 26, 2: 18, 3: 58, 4: 27, 5: 3, 6: 3 }
     },
     {
       deadRow: 1, deadTag: "ت (٣)", splitOrigin: true,
       js: 13, oldOrigin: 6, origin: 4,
       subShares: { 6: 1, 7: 3 },
       jamJs: 1, jam: 270,
       jamShares: { 2: 36, 3: 116, 4: 54, 5: 6, 6: 19, 7: 39 }
     },
     {
       deadRow: 2, deadTag: "ت (٤)", splitOrigin: false,
       js: 3, origin: 12,
       subShares: { 3: 1, 8: 3, 9: 4, 10: 4 },
       jamJs: 36, jam: 270,
       jamShares: { 3: 119, 4: 54, 5: 6, 6: 19, 7: 39, 8: 9, 9: 12, 10: 12 }
     },
     {
       deadRow: 3, deadTag: "ت (٥)", splitOrigin: false,
       js: 119, origin: 36,
       subShares: { 6: 6, 11: 9, 12: 14, 13: 7 },
       jam: 9720,
       jamShares: { 4: 1944, 5: 216, 6: 1398, 7: 1404, 8: 324, 9: 432, 10: 432, 11: 1071, 12: 1666, 13: 833 }
     }
   ]
 },
 {
   id: "m89",
   type: "munasakha",
   title: "(س٨٩) توفي عن ثلاث زوجات (الزوجة الثالثة بنت عمه) وأربع بنات من الزوجة الأولى وأم الأم وأم الأب وأبي الأم، وقبل قسمة التركة ماتت أم الأب عن زوج وأخ شقيق وبقية الورثة، ثم ماتت الزوجة الأولى عن أخت شقيقة وبقية الورثة.",
   firstJs: 8,
   firstSplitOrigin: false,
   firstOrigin: 240,
   rows: [
     { name: "أم أب", firstShare: 21 },
     { name: "زوجة ١", firstShare: 10 },
     { name: "زوجة ٢", firstShare: 10 },
     { name: "زوجة ٣", firstShare: 10 },
     { name: "أم أم", firstShare: 21 },
     { name: "بنت ١", firstShare: 42 },
     { name: "بنت ٢", firstShare: 42 },
     { name: "بنت ٣", firstShare: 42 },
     { name: "بنت ٤", firstShare: 42 },
     { name: "أب أم", firstShare: 0 },
     { name: "زوج", startDeath: 0 },
     { name: "أخ ش", startDeath: 0 },
     { name: "أخت ش", startDeath: 1 }
   ],
   deaths: [
     {
       deadRow: 0, deadTag: "ت (٢)", splitOrigin: false,
       js: 7, origin: 24,
       subShares: { 3: 12, 5: 1, 6: 1, 7: 1, 8: 1, 10: 6, 11: 2 },
       jamJs: 3, jam: 1920,
       jamShares: { 1: 80, 2: 80, 3: 164, 4: 168, 5: 343, 6: 343, 7: 343, 8: 343, 9: 0, 10: 42, 11: 14 }
     },
     {
       deadRow: 1, deadTag: "ت (٣)", splitOrigin: false,
       js: 40, origin: 6,
       subShares: { 5: 1, 6: 1, 7: 1, 8: 1, 12: 2 },
       jam: 5760,
       jamShares: { 2: 240, 3: 492, 4: 504, 5: 1069, 6: 1069, 7: 1069, 8: 1069, 9: 0, 10: 126, 11: 42, 12: 80 }
     }
   ]
 },
 {
   id: "m90",
   type: "munasakha",
   title: "(س٩٠) توفيت عن زوج وأب وأم وابن وبنت وعم شقيق وأخ لأم وأختين لأم، ثم توفي الزوج عن بقية الورثة، ثم توفي الأب عن بقية الورثة، ثم توفيت الأم عن بقية الورثة، أخرج نصيب كل وارث في المسألة بالنسبة المئوية ٪.",
   firstJs: 1,
   firstSplitOrigin: false,
   firstOrigin: 36,
   hasPct: true,
   pctTotal: 100,
   expectedPct: { 3: 44.44, 4: 10.42, 5: 12.5, 6: 22.22, 7: 5.21, 8: 5.21 },
   rows: [
     { name: "زوج", firstShare: 9 },
     { name: "أب", firstShare: 6 },
     { name: "أم", firstShare: 6 },
     { name: "ابن", firstShare: 10 },
     { name: "أخ لأم", firstShare: 0 },
     { name: "عم ش", firstShare: 0 },
     { name: "بنت", firstShare: 5 },
     { name: "أخت لأم ١", firstShare: 0 },
     { name: "أخت لأم ٢", firstShare: 0 }
   ],
   deaths: [
     {
       deadRow: 0, deadTag: "ت (٢)", splitOrigin: false,
       js: 3, origin: 3,
       subShares: { 3: 2, 6: 1 },
       jamJs: 2, jam: 36,
       jamShares: { 1: 6, 2: 6, 3: 16, 4: 0, 5: 0, 6: 8, 7: 0, 8: 0 }
     },
     {
       deadRow: 1, deadTag: "ت (٣)", splitOrigin: false,
       js: 3, origin: 4,
       subShares: { 2: 1, 5: 3 },
       jamJs: 4, jam: 72,
       jamShares: { 2: 15, 3: 32, 4: 0, 5: 9, 6: 16, 7: 0, 8: 0 }
     },
     {
       deadRow: 2, deadTag: "ت (٤)", splitOrigin: false,
       js: 15, origin: 4,
       subShares: { 4: 2, 7: 1, 8: 1 },
       jam: 288,
       jamShares: { 3: 128, 4: 30, 5: 36, 6: 64, 7: 15, 8: 15 }
     }
   ]
 },
 {
   id: "m91",
   type: "munasakha",
   title: "(س٩١) توفيت عن زوج هو ابن عم شقيق لها وبنت وأم الأب وأبي الأب وأخت شقيقة وأخ لأب وابن عم شقيق، ثم توفي أبو الأب عن بقية الورثة، ثم توفيت البنت عن بقية الورثة، ثم توفي الأخ لأب عن بقية الورثة، ثم توفيت أم الأب عن بقية الورثة (على مذهب الحنابلة).",
   firstJs: 4,
   firstSplitOrigin: false,
   firstOrigin: 13,
   rows: [
     { name: "أب أب", firstShare: 2 },
     { name: "بنت", firstShare: 6 },
     { name: "أخ لأب", firstShare: 0 },
     { name: "أم أب", firstShare: 2 },
     { name: "زوج", firstShare: 3 },
     { name: "ابن عم ش", firstShare: 0 },
     { name: "أخت ش", firstShare: 0 }
   ],
   deaths: [
     {
       deadRow: 0, deadTag: "ت (٢)", splitOrigin: false,
       js: 1, origin: 8,
       subShares: { 2: 2, 3: 1, 4: 2, 5: 2, 6: 1 },
       jamJs: 1, jam: 52,
       jamShares: { 1: 24, 2: 2, 3: 9, 4: 14, 5: 2, 6: 1 }
     },
     {
       deadRow: 1, deadTag: "ت (٣)", splitOrigin: false,
       js: 4, origin: 6,
       subShares: { 3: 1, 4: 5 },
       jamJs: 3, jam: 52,
       jamShares: { 2: 2, 3: 13, 4: 34, 5: 2, 6: 1 }
     },
     {
       deadRow: 2, deadTag: "ت (٤)", splitOrigin: false,
       js: 1, origin: 6,
       subShares: { 3: 1, 4: 1, 5: 1, 6: 3 },
       jamJs: 1, jam: 156,
       jamShares: { 3: 40, 4: 103, 5: 7, 6: 6 }
     },
     {
       deadRow: 3, deadTag: "ت (٥)", splitOrigin: false,
       js: 8, origin: 5,
       subShares: { 4: 2, 5: 2, 6: 1 },
       jam: 156,
       jamShares: { 4: 119, 5: 23, 6: 14 }
     }
   ]
 },
 {
   id: "m104",
   type: "munasakha",
   title: "(س١٠٤) توفي عن زوجة وأم وأب وابن وبنت، ثم توفيت الزوجة عن بقية الورثة، ثم توفيت الأم عن بقية الورثة، ثم توفي الأب عن بقية الورثة.",
   firstJs: 1,
   firstSplitOrigin: false,
   firstOrigin: 72,
   rows: [
     { name: "زوجة", firstShare: 9 },
     { name: "أم", firstShare: 12 },
     { name: "أب", firstShare: 12 },
     { name: "ابن", firstShare: 26 },
     { name: "بنت", firstShare: 13 }
   ],
   deaths: [
     {
       deadRow: 0, deadTag: "ت (٢)", splitOrigin: false,
       js: 3, origin: 3,
       subShares: { 3: 2, 4: 1 },
       jamJs: 1, jam: 72,
       jamShares: { 1: 12, 2: 12, 3: 32, 4: 16 }
     },
     {
       deadRow: 1, deadTag: "ت (٣)", splitOrigin: false,
       js: 3, origin: 4,
       subShares: { 2: 1, 3: 2, 4: 1 },
       jamJs: 1, jam: 72,
       jamShares: { 2: 15, 3: 38, 4: 19 }
     },
     {
       deadRow: 2, deadTag: "ت (٤)", splitOrigin: false,
       js: 5, origin: 3,
       subShares: { 3: 2, 4: 1 },
       jam: 3,
       jamShares: { 3: 2, 4: 1 },
       altJam: 72,
       altJamShares: { 3: 48, 4: 24 }
     }
   ]
 }
]
  };