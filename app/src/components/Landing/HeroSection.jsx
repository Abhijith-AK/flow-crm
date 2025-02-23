import { useEffect, useRef } from "react";
import { Link } from "react-router";

const HeroSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        class SineWaveGenerator {
            constructor(options) {
                Object.assign(this, options);

                if (!this.el) throw new Error("No Canvas Selected");
                this.ctx = this.el.getContext("2d");

                if (!this.waves?.length) throw new Error("No waves specified");

                this._resizeWidth();
                window.addEventListener("resize", this._resizeWidth);
                window.addEventListener("resize", this.resizeEvent);

                if (typeof this.initialize === "function") this.initialize();
                this.loop();
            }

            speed = 6;
            amplitude = 80;
            wavelength = 60;
            segmentLength = 10;
            lineWidth = 2;
            strokeStyle = "rgba(255, 255, 255, 0.6)";
            time = 0;

            _resizeWidth = () => {
                this.dpr = window.devicePixelRatio || 1;
                this.width = this.el.width = window.innerWidth * this.dpr;
                this.height = this.el.height = window.innerHeight * this.dpr;
                this.el.style.width = `${window.innerWidth}px`;
                this.el.style.height = `${window.innerHeight}px`;
                this.waveWidth = this.width * 0.5; // Reduce wave width to cover half of the screen
                this.waveLeft = this.width/2; // 
            };

            clear = () => {
                this.ctx.clearRect(0, 0, this.width, this.height);
            };

            update = (time = this.time) => {
                this.time -= 0.007;
                this.waves.forEach((wave) => {
                    this.drawSine(time * (wave.timeModifier || 1), wave);
                });
            };

            drawSine = (time, options) => {
                const { amplitude = this.amplitude, wavelength = this.wavelength, lineWidth = this.lineWidth, strokeStyle = this.strokeStyle, segmentLength = this.segmentLength } = options;
                let x = time;
                let y = 0;
                const yAxis = this.height / 2;
                this.ctx.lineWidth = lineWidth * this.dpr;
                this.ctx.strokeStyle = strokeStyle;
                this.ctx.lineCap = "round";
                this.ctx.lineJoin = "round";
                this.ctx.beginPath();
                this.ctx.moveTo(this.waveLeft, yAxis);
                for (let i = 0; i < this.waveWidth; i += segmentLength) {
                    x = (time * this.speed) + (-yAxis + i) / wavelength;
                    y = Math.sin(x);
                    this.ctx.lineTo(i + this.waveLeft, amplitude * y + yAxis);
                }
                this.ctx.stroke();
            };

            loop = () => {
                this.clear();
                this.update();
                requestAnimationFrame(this.loop);
            };
        }

        setTimeout(() => {
            new SineWaveGenerator({
                el: canvasRef.current,
                speed: 6,
                waves: [
                    // { timeModifier: 1, lineWidth: 3, amplitude: 180, wavelength: 250, segmentLength: 20, strokeStyle: "rgba(255, 255, 255, 0.7)" },
                    { timeModifier: 1, lineWidth: 2, amplitude: 130, wavelength: 120, strokeStyle: "rgba(255, 255, 255, 0.6)" },
                    { timeModifier: 1, lineWidth: 1, amplitude: -140, wavelength: 70, segmentLength: 10, strokeStyle: "rgba(255, 255, 255, 0.5)" },
                    { timeModifier: 1, lineWidth: 0.5, amplitude: -100, wavelength: 110, segmentLength: 10, strokeStyle: "rgba(255, 255, 255, 0.4)" },
                ],
                initialize() { },
            });
        }, 100);
    }, []);

    return (
        <section id="h" className="pt-24 relative w-full h-screen bg-gradient-to-b from-black to-gray-800 flex justify-between items-center px-10 overflow-hidden">
            <div className="text-center md:text-left z-[2] relative max-w-[800px]">
                <h1 className="block text-3xl font-bold text-white sm:text-4xl lg:text-6xl lg:leading-tight">
                    Start your journey with <span className="text-blue-600">FlowCRM</span>
                </h1>
                <p className="mt-3 text-lg text-gray-400">
                    Streamline your workflow with intuitive tools and real-time collaboration, <br /> Designed for modern businesses.
                </p>
                <div className="mt-7 grid gap-3 w-full sm:inline-flex justify-center md:justify-start">
                    <Link to="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all" href="#">
                        Get started Now
                    </Link>
                </div>
            </div>
            <div className="me-auto w-full flex-1">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-md"></canvas>
            </div>
        </section>
    );
};

export default HeroSection;
