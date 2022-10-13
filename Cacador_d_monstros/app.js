new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        playerMana: 100,
        monsterLife: 100,
        logs: []   
    },
    computed: {
        hasResult(){
            return this.playerLife ==0 || this.monsterLife ==0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.playerMana = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'O caçador', 'Rathian', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', 10, 15, false, 'Rathian', 'O caçador', 'monster')
            }
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
        },
        healAndHurt(){
            this.heal(15, 20)
            this.hurt('playerLife', 7, 12, false, 'Rathian', 'Jogador', 'monster')
        },
        heal(min, max) {
            if(this.playerMana > 0){
                this.playerMana = Math.min(this.playerMana - 10, 100)
            }
            if(this.playerMana === 0)
            {
                this.registerLog(`O caçador não tem mais energia para se recuperar!`, 'player')
            }else{
                const heal = this.getRandom(min, max)
                this.playerLife = Math.min(this.playerLife + heal, 100)
                this.registerLog(`O caçador recuperou um total de ${heal} de Vida.`, 'player')
            }
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.logs.unshift( {text, cls} )
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }

    },
})