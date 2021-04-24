class DragAndDropScene extends Phaser.Scene
{
    constructor()
    {
        super('DragAndDropScene');
    }

    preload()
    {
        this.load.image('background', 'assets/images/planet-moons.jpg');
        this.load.image('rocket', 'assets/sprites/rocket.png');
        this.load.image('asteroid1', 'assets/sprites/asteroid1.png');
        this.load.image('asteroid2', 'assets/sprites/asteroid2.png');
    }

    create()
    {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        let rocket = this.physics.add.sprite(500, 450, 'rocket');
        rocket.setScale(0.5);
        rocket.setInteractive();
        rocket.body.setVelocity(-75, 100).setBounce(1, 1).setCollideWorldBounds(true);

        let asteroid1 = this.physics.add.sprite(250, 250, 'asteroid1');
        asteroid1.setInteractive();
        asteroid1.body.setVelocity(100, 110).setBounce(1, 1).setCollideWorldBounds(true);

        let asteroid2 = this.physics.add.sprite(700, 300, 'asteroid2');
        asteroid2.setScale(0.2);
        asteroid2.setInteractive();
        asteroid2.body.setVelocity(-105, -125).setBounce(1, 1).setCollideWorldBounds(true);

        this.input.on('pointerdown', this.onHold, this);
    }

    onHold(pointer, targets)
    {
        this.input.off('pointerdown', this.onHold, this);
        this.target = targets[0];
        this.input.on('pointermove', this.onDrag, this);
        this.input.on('pointerup', this.onLetGo, this);
    }

    onDrag(pointer)
    {
        if(typeof this.target != undefined)
        {
            this.target.x = pointer.x;
            this.target.y = pointer.y;
        }
    }

    onLetGo(pointer)
    {
        this.input.on('pointerdown', this.onHold, this);
        this.input.off('pointermove', this.onDrag, this);
        this.input.off('pointerup', this.onLetGo, this);
    }
}