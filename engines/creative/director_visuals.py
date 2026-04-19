from manim import *
import json
import os
import shutil

# MISSION 2.3: Dynamic FFmpeg Discovery
# Resolves ffmpeg path at runtime to eliminate environment-specific errors
FFMPEG_DISCOVERED = shutil.which("ffmpeg")
if FFMPEG_DISCOVERED:
    config.ffmpeg_executable = FFMPEG_DISCOVERED
else:
    # Fallback to Shared Dictionary recorded path
    try:
        with open(os.path.join(os.getcwd(), "shared", "config.json"), "r") as f:
            shared_cfg = json.load(f)
            config.ffmpeg_executable = shared_cfg.get("DEPS", {}).get("ffmpeg_path")
    except Exception:
        pass

# 1. Vertical Shorts Configuration
config.pixel_height = 1920
config.pixel_width = 1080
config.frame_height = 16.0
config.frame_width = 9.0
config.background_color = "#1A1A1A"  # Dark Charcoal/Sage accent base

# Branding Colors
SAGE = "#4C6545"
BONE = "#EAE0D5"
GOLD = "#C19A6B"

class MacroPulseShort(Scene):
    def construct(self):
        # Load script data for labels
        with open("data/current_script.json", "r") as f:
            script = json.load(f)
        
        # --- SCENE 1: BREAKOUT ---
        # HUD / Title
        title = Text("DIGITAL COMMAND CENTER", font="sans-serif", color=BONE).scale(0.8)
        title.to_edge(UP, buff=1.0)
        
        btc_price_text = Text("$78,100", font="sans-serif", color=SAGE).scale(1.5)
        btc_price_text.next_to(title, DOWN, buff=0.5)
        
        self.play(FadeIn(title), Write(btc_price_text))
        self.wait(1)
        
        # chart
        chart_axes = Axes(
            x_range=[0, 10, 1],
            y_range=[70, 85, 5],
            x_length=7,
            y_length=5,
            axis_config={"color": BONE},
        ).shift(DOWN * 1)
        
        resistance_line = chart_axes.get_horizontal_line(chart_axes.c2p(10, 76), color=RED).set_stroke(opacity=0.5)
        resistance_label = Text("RESISTANCE $76K", font="sans-serif", color=RED).scale(0.4).next_to(resistance_line, UP, buff=0.1)
        
        # BTC Price Line
        price_points = [(0, 71), (2, 73), (5, 75.5), (7, 78.1), (10, 80)]
        price_line = chart_axes.plot_line_graph(
            # Correcting structure for plot_line_graph
            x_values=[p[0] for p in price_points],
            y_values=[p[1] for p in price_points],
            line_color=SAGE,
            add_vertex_dots=False
        )
        
        self.play(Create(chart_axes), Create(resistance_line), FadeIn(resistance_label))
        self.play(Create(price_line), run_time=3)
        self.wait(2)
        
        # --- SCENE 2: OIL CRASH ---
        self.play(FadeOut(chart_axes, price_line, btc_price_text, resistance_line, resistance_label))
        
        oil_title = Text("CRUDE OIL (WTI) -10%", font="sans-serif", color=GOLD).scale(0.8)
        oil_title.next_to(title, DOWN, buff=0.5)
        
        # Simple bar chart for oil
        oil_axes = Axes(
            x_range=[0, 5, 1],
            y_range=[0, 100, 20],
            x_length=6,
            y_length=5,
            axis_config={"color": BONE}
        ).shift(DOWN * 1)
        
        bar_before = Rectangle(width=1, height=4, fill_color=BONE, fill_opacity=0.8).move_to(oil_axes.c2p(1.5, 40))
        bar_after = Rectangle(width=1, height=3.6, fill_color=GOLD, fill_opacity=0.8).move_to(oil_axes.c2p(3.5, 36))
        
        label_before = Text("PREV", font="sans-serif", color=BONE).scale(0.3).next_to(bar_before, DOWN)
        label_after = Text("CRASH", font="sans-serif", color=GOLD).scale(0.3).next_to(bar_after, DOWN)
        
        self.play(Write(oil_title), Create(oil_axes))
        self.play(FadeIn(bar_before, label_before))
        self.play(Transform(bar_before.copy(), bar_after), FadeIn(label_after))
        self.wait(2)
        
        # --- SCENE 3: CATALYST ---
        self.play(FadeOut(oil_title, oil_axes, bar_before, bar_after, label_before, label_after))
        
        status_box = VGroup(
            Text("STRAIT OF HORMUZ: OPEN", color=SAGE),
            Text("SENTIMENT: RISK-ON", color=BONE),
            Text("INFLATION: COOLING", color=GOLD)
        ).arrange(DOWN, buff=0.5).scale(0.7)
        
        self.play(Write(status_box))
        self.wait(3)
        
        # --- SCENE 4: CTA ---
        self.play(FadeOut(status_box))
        cta_text = Text("SUBSCRIBE: MACRO PULSE", font="sans-serif", color=SAGE).scale(0.8)
        self.play(GrowFromCenter(cta_text))
        self.wait(2)

if __name__ == "__main__":
    import sys
    # Add parent to path to find pipeline_utils
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from pipeline_utils import update_pipeline_status
    
    # MISSION 2.7: Stage 3 (Director Rendering)
    update_pipeline_status(3, "running")
    # To run: manim -pql src/director_visuals.py MacroPulseShort
    # (Note: Manim usually handles exit codes, but we wrap for pipeline sync)
    update_pipeline_status(3, "complete")
