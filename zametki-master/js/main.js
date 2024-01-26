const storageKey = "notes-app";
const storageData = localStorage.getItem(storageKey);
const initialData = storageData
  ? JSON.parse(storageData)
  : {
      firstColumn: [],
      secondColumn: [],
      thirdColumn: [],
    };

let app = new Vue({
  el: "#app",
  data: {
    firstColumn: initialData.firstColumn,
    secondColumn: initialData.secondColumn,
    thirdColumn: initialData.thirdColumn,
    groupName: null,
    inputOne: null,
    inputTwo: null,
    inputThr: null,
    inputFor: null,
    inputFiv: null,
  },

  watch: {
    firstColumn: {
      handler(newFirstColumn) {
        this.saveData();
        this.checkMoveCard();
      },
      deep: true,
    },
    secondColumn: {
      handler(newSecondColumn) {
        this.saveData();
        this.checkMoveCard();
      },
      deep: true,
    },
    thirdColumn: {
      handler(newThirdColumn) {
        this.saveData();
      },
      deep: true,
    },
  },
  methods: {
    toggleItem(card, item) {
      // Проверяем, не заблокирован ли пункт
      if (!item.locked) {
        item.checked = !item.checked;
        item.locked = true; // Блокируем пункт после нажатия
        this.updateProgress(card);
      }
    },

    isThirdColumnItem(card) {
      return this.thirdColumn.includes(card);
    },
    updateProgress(card) {
      const checkedCount = card.items.filter((item) => item.checked).length;
      const progress = (checkedCount / card.items.length) * 100;
      card.isComplete = progress === 100;
      if (card.isComplete) {
        card.lastChecked = new Date().toLocaleString();
      }
      this.checkMoveCard();
    },
    MoveFirstColm() {
      this.firstColumn.forEach((card) => {
        const progress =
          (card.items.filter((item) => item.checked).length /
            card.items.length) *
          100;

        const isMaxSecondColumn = this.secondColumn.length >= 5;

        if (progress >= 50 && !isMaxSecondColumn) {
          this.secondColumn.push(card);
          this.firstColumn.splice(this.firstColumn.indexOf(card), 1);
          this.checkMoveCard();
        }
      });
    },
    MoveSecondColm() {
      this.secondColumn.forEach((card) => {
        const progress =
          (card.items.filter((item) => item.checked).length /
            card.items.length) *
          100;
        if (progress === 100) {
          card.isComplete = true;
          card.lastChecked = new Date().toLocaleString();
          this.thirdColumn.push(card);
          this.secondColumn.splice(this.secondColumn.indexOf(card), 1);
          this.MoveFirstColm();
        }
      });
    },
    checkMoveCard() {
      this.MoveFirstColm();
      this.MoveSecondColm();
    },

    addCard() {
      const newGroup = {
        id: Date.now(),
        groupName: this.groupName,
        items: [],
      };

      // Добавляем только заполненные пункты
      if (this.inputOne)
        newGroup.items.push({ text: this.inputOne, checked: false });
      if (this.inputTwo)
        newGroup.items.push({ text: this.inputTwo, checked: false });
      if (this.inputThr)
        newGroup.items.push({ text: this.inputThr, checked: false });
      if (this.inputFor)
        newGroup.items.push({ text: this.inputFor, checked: false });
      if (this.inputFiv)
        newGroup.items.push({ text: this.inputFiv, checked: false });

      // Проверяем, что добавляемая группа содержит хотя бы один элемент
      if (newGroup.items.length > 0) {
        this.firstColumn.push(newGroup);

        // Очищаем поля ввода
        this.groupName = null;
        this.inputOne = null;
        this.inputTwo = null;
        this.inputThr = null;
        this.inputFor = null;
        this.inputFiv = null;

        this.checkMoveCard();
      } else {
        alert(
          "Пожалуйста, заполните хотя бы одно поле перед добавлением карточки."
        );
      }
    },

    saveData() {
      const data = {
        firstColumn: this.firstColumn,
        secondColumn: this.secondColumn,
        thirdColumn: this.thirdColumn,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    dragStart(card) {
      event.dataTransfer.setData("text/plain", JSON.stringify(card));
    },
    removeCard(card) {
      const indexInThirdColumn = this.thirdColumn.indexOf(card);
      if (indexInThirdColumn !== -1) {
        this.thirdColumn.splice(indexInThirdColumn, 1);
        this.$forceUpdate();
        this.checkMoveCard();
      }
    },
  },
});
