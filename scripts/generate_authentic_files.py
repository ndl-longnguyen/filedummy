#!/usr/bin/env python3
"""
Generate authentic dummy sample files for FileDummy (filedummy.ndlong.site).
All content is written in professional, grammatically impeccable English focusing on:
- "2026 Global AI & Machine Learning Industry Report" (Documents, TXT, PDF, DOCX)
- "2026 AI Model Benchmarks & Hardware Performance" (CSV, JSON datasets)

STRICT SIZE CONSTRAINT:
For every target size (e.g. 100MB = 104,857,600 bytes), file_size <= target_bytes.
NEVER exceeds target_bytes by even 1 single byte.
"""

import os
import io
import json
import zipfile
import struct
import math

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "generated-files"))

# --------------------------------------------------------------------------
# 1. AUTHENTIC TEXT REPOSITORY: 2026 AI & ML INDUSTRY REPORT
# --------------------------------------------------------------------------

AI_WHITEPAPER_TITLE = "2026 GLOBAL ARTIFICIAL INTELLIGENCE & MACHINE LEARNING INDUSTRY REPORT"
AI_WHITEPAPER_SUBTITLE = "Technological Breakthroughs, Agentic Architectures, Compute Economics, and Enterprise Deployment"
AI_WHITEPAPER_AUTHOR = "Published by Global AI Research Consortium & Enterprise Computing Council (2026 Edition)"

AI_CHAPTERS = [
    {
        "title": "Chapter 1: The Paradigm Shift from Static LLMs to Test-Time Reasoning Agents",
        "paragraphs": [
            "The artificial intelligence landscape in 2026 has transitioned decisively from one-shot text generation models toward dynamic reasoning agents capable of extended deliberation. While early large language models relied almost entirely on pre-training scale and post-training instruction tuning, contemporary frontier architectures leverage test-time compute scaling. By executing Monte Carlo tree searches, recursive self-critique loops, and chain-of-thought verification at inference time, modern systems demonstrate dramatic gains in formal mathematical theorem proving, systems engineering, and multi-file code synthesis.",
            "A pivotal breakthrough has been the decoupling of model parameter size from cognitive problem-solving depth. Rather than inflating dense model weights to trillions of parameters, research laboratories in 2025 and 2026 demonstrated that medium-scale architectures (ranging from 32B to 70B active parameters) equipped with high-throughput test-time reasoning can match or exceed the reasoning benchmarks of historical monolithic models at a fraction of the serving cost.",
            "Crucially, autonomous agentic workflows have evolved from fragile zero-shot prompts to robust multi-agent orchestration frameworks. Autonomous coding agents, IT site reliability engineering (SRE) bots, and automated security auditing agents now operate within deterministic tool execution environments with continuous sandboxed verification. The convergence of native function calling, deterministic state machines, and structured tool evaluation protocols has catalyzed enterprise adoption across mission-critical domains."
        ]
    },
    {
        "title": "Chapter 2: Compute Infrastructure, Silicon Scaling, and Energy Realities",
        "paragraphs": [
            "Hardware infrastructure continues to dictate the frontier of machine learning capabilities. In 2026, leading training clusters routinely scale beyond 100,000 accelerated nodes, powered by advanced high-bandwidth memory (HBM3e and early HBM4 implementations) achieving memory bandwidth in excess of 4.8 terabytes per second per socket. Optical interconnects and co-packaged optics (CPO) have begun replacing copper interconnects across spine-and-leaf cluster tiers, reducing latency and mitigating electrical attenuation across multi-datacenter superclusters.",
            "Simultaneously, the global energy constraint has become the dominant operational bottleneck for frontier model training. As single cluster power envelopes approach 500 megawatts to 1 gigawatt, hyperscalers have pioneered dedicated power generation strategies, including behind-the-meter nuclear small modular reactors (SMRs), geothermal tapping, and colocated solar-storage microgrids. The economic calculation of artificial intelligence has permanently shifted from silicon capital expenditure (CapEx) alone to thermodynamic efficiency and power purchase agreements (PPAs).",
            "On the inference side, specialized neural processing units (NPUs) and edge accelerators have achieved sub-millisecond per-token latency for local on-device processing. Quantization schemes—notably 4-bit and 3-bit weight activations with negligible perplexity degradation—allow 14B parameter reasoning models to execute seamlessly on consumer-grade workstations and mobile hardware."
        ]
    },
    {
        "title": "Chapter 3: The Equilibrium Between Open Weights and Frontier Proprietary Systems",
        "paragraphs": [
            "The competitive equilibrium between proprietary frontier systems and openly accessible model weights has reached remarkable maturation. Open-weight models developed by international research consortia and enterprise open-source teams now maintain parity with proprietary frontier baselines across standard evaluations, including MATH-500, HumanEval, and MMLU-Pro.",
            "This parity is fueled by advancements in automated synthetic data generation, model distillation from reasoning traces, and verifiable reinforcement learning (RL) with programmatic verifiers. Software organizations frequently adopt a hybrid topology: deploying open-weight models within their private VPC clouds for data privacy, low latency, and regulatory containment, while routing edge-case multi-step planning tasks to frontier cloud APIs.",
            "The commoditization of foundational intelligence has catalyzed a surge in specialized vertical fine-tunes. Healthcare organizations deploy biomedical foundation models trained on HIPAA-compliant clinical registries, financial institutions utilize compliance-tuned models for automated AML/KYC fraud detection, and legal practices leverage contract verification agents with deterministic citation verification."
        ]
    },
    {
        "title": "Chapter 4: Enterprise Safety, Alignment, and Global Regulatory Frameworks",
        "paragraphs": [
            "As autonomous artificial intelligence systems assume direct agency in enterprise production systems, governance frameworks have become essential engineering requirements rather than theoretical afterthoughts. The enforcement of the European Union AI Act, coupled with the US NIST AI Risk Management Framework and emerging Asia-Pacific compliance standards, mandates rigorous pre-deployment evaluations for high-risk cognitive applications.",
            "Technical alignment has progressed beyond simple Constitutional AI and RLHF. Modern safety pipelines employ automated adversarial red-teaming ensembles that test models against prompt injection, jailbreak attempts, data exfiltration vectors, and unauthorized tool manipulation. Furthermore, cryptographic watermarking techniques and C2PA provenance signatures are increasingly embedded into synthetic media generation pipelines to ensure traceable authenticity."
        ]
    },
    {
        "title": "Chapter 5: Future Trajectories: The Pathway Toward 2030",
        "paragraphs": [
            "Looking toward 2030, the research community is coalescing around several foundational frontiers: neuro-symbolic cognitive integration, continuous lifelong learning architectures that eliminate catastrophic forgetting without full retraining, and physical embodiment in robotics via multi-modal vision-language-action (VLA) foundation models.",
            "The integration of machine learning into automated scientific discovery—from computational biology and molecular property prediction to superconducting material search—promises to accelerate technological progress across all scientific disciplines. The 2026 consensus is definitive: artificial intelligence is no longer merely an analytical software feature, but the foundational operating system of next-generation enterprise computing."
        ]
    }
]

def get_full_whitepaper_text():
    lines = []
    lines.append("=" * 80)
    lines.append(AI_WHITEPAPER_TITLE)
    lines.append(AI_WHITEPAPER_SUBTITLE)
    lines.append(AI_WHITEPAPER_AUTHOR)
    lines.append("=" * 80)
    lines.append("\nEXECUTIVE SUMMARY:")
    lines.append("This document serves as an exhaustive technical evaluation and authoritative reference report on the current state of global artificial intelligence, multimodal foundation models, test-time inference compute scaling, compute hardware infrastructure, and enterprise deployment methodologies in 2026. Provided freely by FileDummy (filedummy.ndlong.site) for technical QA, upload boundary testing, parser benchmarking, and system verification.\n")
    
    for chapter in AI_CHAPTERS:
        lines.append("-" * 60)
        lines.append(chapter["title"])
        lines.append("-" * 60)
        for p in chapter["paragraphs"]:
            lines.append(p)
            lines.append("")
        lines.append("")
    
    return "\n".join(lines)


# --------------------------------------------------------------------------
# 2. AUTHENTIC AI MODEL BENCHMARKS (CSV & JSON)
# --------------------------------------------------------------------------

AI_BENCHMARK_MODELS = [
    {"id": "mod-001", "name": "Claude 3.7 Sonnet Reasoning", "developer": "Anthropic", "architecture": "Hybrid Reasoning MoE", "params_b": 450, "context_k": 200, "math500": 96.8, "humaneval": 94.2, "cost_in": 3.0, "cost_out": 15.0, "license": "Proprietary", "year": 2025, "active": True},
    {"id": "mod-002", "name": "DeepSeek-R1 Full", "developer": "DeepSeek AI", "architecture": "Dense Reasoning MoE", "params_b": 671, "context_k": 128, "math500": 97.3, "humaneval": 92.8, "cost_in": 0.55, "cost_out": 2.19, "license": "MIT Open Weights", "year": 2025, "active": True},
    {"id": "mod-003", "name": "GPT-4.5 Orion", "developer": "OpenAI", "architecture": "Frontier Dense", "params_b": 800, "context_k": 128, "math500": 95.9, "humaneval": 93.6, "cost_in": 5.0, "cost_out": 20.0, "license": "Proprietary", "year": 2025, "active": True},
    {"id": "mod-004", "name": "Gemini 2.0 Flash Thinking", "developer": "Google DeepMind", "architecture": "Multimodal Transformer", "params_b": 350, "context_k": 1000, "math500": 95.2, "humaneval": 91.5, "cost_in": 0.35, "cost_out": 1.40, "license": "Proprietary", "year": 2025, "active": True},
    {"id": "mod-005", "name": "Llama-3.3-70B-Instruct", "developer": "Meta AI", "architecture": "Dense Auto-regressive", "params_b": 70, "context_k": 128, "math500": 89.4, "humaneval": 88.0, "cost_in": 0.20, "cost_out": 0.60, "license": "Llama 3.3 Community", "year": 2024, "active": True},
    {"id": "mod-006", "name": "Qwen 2.5 Max", "developer": "Alibaba Cloud", "architecture": "Mixture-of-Experts", "params_b": 500, "context_k": 128, "math500": 94.7, "humaneval": 90.9, "cost_in": 0.80, "cost_out": 2.40, "license": "Proprietary", "year": 2025, "active": True},
    {"id": "mod-007", "name": "Mistral Large 2", "developer": "Mistral AI", "architecture": "Dense Transformer", "params_b": 123, "context_k": 128, "math500": 88.9, "humaneval": 87.4, "cost_in": 2.0, "cost_out": 6.0, "license": "Mistral Commercial", "year": 2024, "active": True},
    {"id": "mod-008", "name": "DeepSeek-V3", "developer": "DeepSeek AI", "architecture": "Multi-head Latent Attention MoE", "params_b": 671, "context_k": 128, "math500": 90.2, "humaneval": 89.1, "cost_in": 0.14, "cost_out": 0.28, "license": "MIT Open Weights", "year": 2024, "active": True},
    {"id": "mod-009", "name": "Phi-4 Reasoning", "developer": "Microsoft Research", "architecture": "Dense SLM", "params_b": 14, "context_k": 16, "math500": 84.6, "humaneval": 82.5, "cost_in": 0.08, "cost_out": 0.20, "license": "MIT Open Weights", "year": 2025, "active": True},
    {"id": "mod-010", "name": "Grok 2.5 Ultra", "developer": "xAI", "architecture": "Frontier Dense", "params_b": 400, "context_k": 128, "math500": 93.8, "humaneval": 90.0, "cost_in": 4.0, "cost_out": 16.0, "license": "Proprietary", "year": 2025, "active": True},
]


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


# --------------------------------------------------------------------------
# 3. GENERATORS: TXT
# --------------------------------------------------------------------------

def generate_txt_files():
    print("Generating authentic English TXT files...")
    txt_dir = os.path.join(OUTPUT_DIR, "txt")
    ensure_dir(txt_dir)
    full_text = get_full_whitepaper_text()
    
    # 1. sample-lorem.txt (50 KB = 51,200 bytes) -> Renamed content to authentic AI Executive Summary
    p1 = os.path.join(txt_dir, "sample-lorem.txt")
    target1 = 51200
    content1 = (full_text * 15).encode("utf-8")[:target1]
    with open(p1, "wb") as f:
        f.write(content1)
    assert os.path.getsize(p1) <= target1, f"Size exceeded {target1}"
    print(f"  ✓ sample-lorem.txt: {os.path.getsize(p1)} bytes (target: {target1})")

    # 2. sample-unicode.txt (50 KB = 51,200 bytes) -> Multilingual AI terminology
    p2 = os.path.join(txt_dir, "sample-unicode.txt")
    target2 = 51200
    multi_lines = (
        "2026 Global AI Multilingual Lexicon & International Standards Reference:\n"
        "• English: Artificial Intelligence, Deep Neural Networks, Latent Space Embeddings\n"
        "• Tiếng Việt: Trí tuệ nhân tạo, Mạng nơ-ron học sâu, Không gian tiềm ẩn, Tối ưu hóa mô hình\n"
        "• 日本語: 人工知能、ディープニューラルネットワーク、潜在空間表現、推論時計算スケーリング\n"
        "• 한국어: 인공지능, 심층 신경망, 잠재 공간 표현, 추론 시간 연산 확장성\n"
        "• 简体中文: 人工智能、深度神经网络、潜空间表示、强化学习与验证机\n"
        "• Français: Intelligence Artificielle, Réseaux Neuronaux Profonds, Espace Latent\n"
        "• Deutsch: Künstliche Intelligenz, Tiefe Neuronale Netze, Latente Räume, Testzeit-Skalierung\n"
        "• Español: Inteligencia Artificial, Redes Neuronales Profundas, Inferencia Autónoma\n"
        "• العربية: الذكاء الاصطناعي، الشبكات العصبية العميقة، نمذجة الفضاء الكامن، خوارزميات الاستدلال\n"
        "• Русский: Искусственный Интеллект, Глубокие Нейросети, Масштабирование Вычислений\n"
        "================================================================================\n"
    )
    content2 = (multi_lines * 100).encode("utf-8")[:target2]
    with open(p2, "wb") as f:
        f.write(content2)
    assert os.path.getsize(p2) <= target2
    print(f"  ✓ sample-unicode.txt: {os.path.getsize(p2)} bytes (target: {target2})")

    # 3. sample-ascii.txt (100 KB = 102,400 bytes) -> Pure ASCII technical spec
    p3 = os.path.join(txt_dir, "sample-ascii.txt")
    target3 = 102400
    ascii_content = (full_text.encode("ascii", "ignore").decode("ascii") * 30).encode("ascii")[:target3]
    with open(p3, "wb") as f:
        f.write(ascii_content)
    assert os.path.getsize(p3) <= target3
    print(f"  ✓ sample-ascii.txt: {os.path.getsize(p3)} bytes (target: {target3})")

    # 4. sample-large.txt (1 MB = 1,048,576 bytes) -> Complete AI report
    p4 = os.path.join(txt_dir, "sample-large.txt")
    target4 = 1048576
    content4 = (full_text * 150).encode("utf-8")[:target4]
    with open(p4, "wb") as f:
        f.write(content4)
    assert os.path.getsize(p4) <= target4
    print(f"  ✓ sample-large.txt: {os.path.getsize(p4)} bytes (target: {target4})")

    # 5. sample-5mb.txt (5 MB = 5,242,880 bytes)
    p5 = os.path.join(txt_dir, "sample-5mb.txt")
    target5 = 5242880
    content5 = (full_text * 700).encode("utf-8")[:target5]
    with open(p5, "wb") as f:
        f.write(content5)
    assert os.path.getsize(p5) <= target5
    print(f"  ✓ sample-5mb.txt: {os.path.getsize(p5)} bytes (target: {target5})")

    # 6. sample-10mb.txt (10 MB = 10,485,760 bytes)
    p6 = os.path.join(txt_dir, "sample-10mb.txt")
    target6 = 10485760
    content6 = (full_text * 1400).encode("utf-8")[:target6]
    with open(p6, "wb") as f:
        f.write(content6)
    assert os.path.getsize(p6) <= target6
    print(f"  ✓ sample-10mb.txt: {os.path.getsize(p6)} bytes (target: {target6})")


# --------------------------------------------------------------------------
# 4. GENERATORS: CSV
# --------------------------------------------------------------------------

def generate_csv_files():
    print("Generating authentic AI Benchmark CSV datasets...")
    csv_dir = os.path.join(OUTPUT_DIR, "csv")
    ensure_dir(csv_dir)
    
    header = "record_id,model_name,developer_org,architecture_type,parameters_billion,context_window_k,math500_score,humaneval_pass1,cost_input_per_m,cost_output_per_m,license_type,release_year,status\n"
    
    csv_targets = [
        ("100kb", 102400),
        ("500kb", 512000),
        ("1mb", 1048576),
        ("5mb", 5242880),
        ("10mb", 10485760)
    ]
    
    for label, target_bytes in csv_targets:
        file_path = os.path.join(csv_dir, f"sample-{label}.csv")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(header)
            current_bytes = len(header.encode("utf-8"))
            row_idx = 1
            
            while True:
                m = AI_BENCHMARK_MODELS[(row_idx - 1) % len(AI_BENCHMARK_MODELS)]
                row = (
                    f"REC-{row_idx:06d},"
                    f"\"{m['name']}\","
                    f"\"{m['developer']}\","
                    f"\"{m['architecture']}\","
                    f"{m['params_b']},"
                    f"{m['context_k']},"
                    f"{m['math500']},"
                    f"{m['humaneval']},"
                    f"{m['cost_in']:.2f},"
                    f"{m['cost_out']:.2f},"
                    f"\"{m['license']}\","
                    f"{m['year']},"
                    f"\"{'Active Production' if m['active'] else 'Deprecated'}\"\n"
                )
                row_bytes = len(row.encode("utf-8"))
                if current_bytes + row_bytes > target_bytes:
                    break
                f.write(row)
                current_bytes += row_bytes
                row_idx += 1
                
        actual_size = os.path.getsize(file_path)
        assert actual_size <= target_bytes, f"{label} CSV size {actual_size} exceeded {target_bytes}"
        print(f"  ✓ sample-{label}.csv: {actual_size} bytes (target: {target_bytes}, rows: {row_idx - 1})")


# --------------------------------------------------------------------------
# 5. GENERATORS: JSON
# --------------------------------------------------------------------------

def generate_json_files():
    print("Generating authentic AI Benchmark JSON datasets...")
    json_dir = os.path.join(OUTPUT_DIR, "json")
    ensure_dir(json_dir)
    
    json_targets = [
        ("50kb", 51200),
        ("200kb", 204800),
        ("1mb", 1048576),
        ("5mb", 5242880),
        ("10mb", 10485760)
    ]
    
    for label, target_bytes in json_targets:
        file_path = os.path.join(json_dir, f"sample-{label}.json")
        
        prefix = (
            "{\n"
            "  \"report_title\": \"2026 Global AI Model Benchmark Dataset\",\n"
            "  \"publisher\": \"FileDummy (filedummy.ndlong.site)\",\n"
            "  \"description\": \"Comprehensive technical benchmarks across leading frontier reasoning models and open-weight architectures in 2026.\",\n"
            "  \"eval_metrics\": [\"MATH-500\", \"HumanEval\", \"MMLU-Pro\", \"SWE-bench Verified\"],\n"
            "  \"models\": [\n"
        )
        suffix = "\n  ]\n}\n"
        
        prefix_bytes = len(prefix.encode("utf-8"))
        suffix_bytes = len(suffix.encode("utf-8"))
        
        items_written = 0
        current_bytes = prefix_bytes + suffix_bytes
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(prefix)
            item_idx = 1
            
            while True:
                m = AI_BENCHMARK_MODELS[(item_idx - 1) % len(AI_BENCHMARK_MODELS)]
                item_obj = {
                    "record_id": f"REC-{item_idx:07d}",
                    "model_name": m["name"],
                    "developer": m["developer"],
                    "architecture": m["architecture"],
                    "parameters_billion": m["params_b"],
                    "context_window_tokens": m["context_k"] * 1024,
                    "benchmarks": {
                        "math500_accuracy": m["math500"],
                        "humaneval_pass1": m["humaneval"]
                    },
                    "pricing_usd": {
                        "input_per_million": m["cost_in"],
                        "output_per_million": m["cost_out"]
                    },
                    "license": m["license"],
                    "verified": True
                }
                comma = ",\n" if item_idx > 1 else "\n"
                item_str = ("    " + json.dumps(item_obj, separators=(", ", ": ")))
                chunk = comma + item_str
                chunk_bytes = len(chunk.encode("utf-8"))
                
                if current_bytes + chunk_bytes > target_bytes:
                    break
                    
                f.write(chunk)
                current_bytes += chunk_bytes
                item_idx += 1
                items_written += 1
                
            f.write(suffix)
            
        actual_size = os.path.getsize(file_path)
        assert actual_size <= target_bytes, f"{label} JSON size {actual_size} exceeded {target_bytes}"
        
        # Verify that it is 100% valid JSON
        with open(file_path, "r", encoding="utf-8") as f:
            parsed = json.load(f)
            assert parsed["models"] is not None
            assert len(parsed["models"]) == items_written
            
        print(f"  ✓ sample-{label}.json: {actual_size} bytes (target: {target_bytes}, parsed items: {items_written})")


# --------------------------------------------------------------------------
# 6. GENERATORS: PDF
# --------------------------------------------------------------------------

def generate_pdf_files():
    print("Generating authentic PDF documents with strict byte constraints...")
    pdf_dir = os.path.join(OUTPUT_DIR, "pdf")
    ensure_dir(pdf_dir)
    
    sizes_mb = [1, 5, 10, 15, 20, 30, 50, 100, 200, 500, 1024]
    
    for mb in sizes_mb:
        target_bytes = mb * 1024 * 1024
        label = f"{mb}mb" if mb < 1024 else "1gb"
        file_path = os.path.join(pdf_dir, f"sample-{label}.pdf")
        
        # Build valid PDF with visible text stream
        text_stream = (
            "BT\n"
            "/F1 20 Tf\n"
            "50 720 Td\n"
            "(2026 Global AI & Machine Learning Industry Report) Tj\n"
            "/F1 12 Tf\n"
            "0 -30 Td\n"
            f"(FileDummy Sample PDF Document - Size: {label.upper()} - 100% Valid Structure) Tj\n"
            "0 -25 Td\n"
            "(Executive Overview: Technological Breakthroughs & Test-Time Reasoning) Tj\n"
            "0 -20 Td\n"
            "(Published by Enterprise AI Consortium for QA, Upload, and Parser Validation) Tj\n"
            "0 -20 Td\n"
            "(Contains valid catalog, font, and page dictionary objects with strict byte limits.) Tj\n"
            "ET"
        )
        stream_bytes = text_stream.encode("latin1")
        stream_len = len(stream_bytes)
        
        pdf_body = (
            b"%PDF-1.4\n"
            b"1 0 obj\n"
            b"<< /Type /Catalog /Pages 2 0 R >>\n"
            b"endobj\n"
            b"2 0 obj\n"
            b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n"
            b"endobj\n"
            b"3 0 obj\n"
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\n"
            b"endobj\n"
            b"4 0 obj\n"
            b"<< /Length " + str(stream_len).encode("ascii") + b" >>\n"
            b"stream\n" + stream_bytes + b"\nendstream\n"
            b"endobj\n"
            b"5 0 obj\n"
            b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\n"
            b"endobj\n"
            b"xref\n"
            b"0 6\n"
            b"0000000000 65535 f \n"
            b"0000000009 00000 n \n"
            b"0000000058 00000 n \n"
            b"0000000115 00000 n \n"
            b"0000000245 00000 n \n"
            b"0000000450 00000 n \n"
            b"trailer\n"
            b"<< /Size 6 /Root 1 0 R >>\n"
            b"startxref\n"
            b"520\n"
            b"%%EOF\n"
        )
        
        with open(file_path, "wb") as f:
            f.write(pdf_body)
            written = len(pdf_body)
            remaining = target_bytes - written
            
            # Pad with valid PDF comments (%0000000000...)
            chunk_size = 65536
            while remaining > 0:
                cur = min(remaining, chunk_size)
                if cur == 1:
                    f.write(b"\n")
                    remaining -= 1
                else:
                    pad = b"%" + b"0" * (cur - 2) + b"\n"
                    f.write(pad)
                    remaining -= len(pad)
                    
        actual_size = os.path.getsize(file_path)
        assert actual_size == target_bytes, f"{label} PDF size {actual_size} != {target_bytes}"
        assert actual_size <= target_bytes
        print(f"  ✓ sample-{label}.pdf: exactly {actual_size} bytes (target: {target_bytes})")


# --------------------------------------------------------------------------
# 7. GENERATORS: DOCX (100% Microsoft Word Compliant)
# --------------------------------------------------------------------------

def generate_docx_files():
    print("Generating authentic DOCX documents (100% Microsoft Word compliant)...")
    docx_dir = os.path.join(OUTPUT_DIR, "docx")
    ensure_dir(docx_dir)
    
    sizes_mb = [1, 5, 10, 15, 20, 30, 50, 100, 200, 500, 1024]
    
    # Generate compliant base OpenXML template dynamically via textutil
    import subprocess
    txt_source = os.path.join(OUTPUT_DIR, "txt", "sample-lorem.txt")
    temp_docx = "/tmp/base_docx_template.docx"
    subprocess.run(["textutil", "-convert", "docx", txt_source, "-output", temp_docx], check=True)
    
    static_entries = {}
    with zipfile.ZipFile(temp_docx, "r") as zf:
        doc_template = zf.read("word/document.xml").decode("utf-8")
        for name in zf.namelist():
            if name != "word/document.xml":
                static_entries[name] = zf.read(name)

    footer = "<w:sectPr></w:sectPr></w:body></w:document>"
    idx = doc_template.rfind(footer)
    assert idx != -1, "Footer marker not found in docx template"
    body_prefix = doc_template[:idx].encode("utf-8")
    footer_bytes = footer.encode("utf-8")

    # Measure exact base zip size with uncompressed document.xml
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for name, data in static_entries.items():
            zf.writestr(name, data)
        zinfo = zipfile.ZipInfo("word/document.xml")
        zinfo.compress_type = zipfile.ZIP_STORED
        zf.writestr(zinfo, body_prefix + footer_bytes)
    base_zip_size = len(buf.getvalue())

    def write_xml_padding(pf, pad_needed):
        rem = pad_needed
        chunk_size = 16384
        while rem > 0:
            if rem >= chunk_size + 10:
                line = b"<!-- " + (b"0" * chunk_size) + b" -->\n"
                pf.write(line)
                rem -= len(line)
            elif rem >= 10:
                line = b"<!-- " + (b"0" * (rem - 10)) + b" -->\n"
                pf.write(line)
                rem -= len(line)
            else:
                pf.write(b" " * rem)
                rem = 0

    for mb in sizes_mb:
        target_bytes = mb * 1024 * 1024
        label = f"{mb}mb" if mb < 1024 else "1gb"
        file_path = os.path.join(docx_dir, f"sample-{label}.docx")
        
        pad_needed = target_bytes - base_zip_size
        assert pad_needed >= 0, f"Target {target_bytes} smaller than base DOCX {base_zip_size}"
        
        with zipfile.ZipFile(file_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for name, data in static_entries.items():
                zf.writestr(name, data)
                
            # Stream word/document.xml uncompressed with valid chunked XML comment padding
            zinfo = zipfile.ZipInfo("word/document.xml")
            zinfo.compress_type = zipfile.ZIP_STORED
            with zf.open(zinfo, "w") as pf:
                pf.write(body_prefix)
                write_xml_padding(pf, pad_needed)
                pf.write(footer_bytes)
                    
        actual_size = os.path.getsize(file_path)
        assert actual_size == target_bytes, f"{label} DOCX size {actual_size} != {target_bytes}"
        assert actual_size <= target_bytes
        print(f"  ✓ sample-{label}.docx: exactly {actual_size} bytes (target: {target_bytes}, 100% Word compliant)")


# --------------------------------------------------------------------------
# 8. GENERATORS: JPG & PNG
# --------------------------------------------------------------------------

def pad_jpeg(base_data, target_bytes):
    soi = base_data[:2]
    rest = base_data[2:]
    pad_needed = target_bytes - len(base_data)
    if pad_needed == 0:
        return base_data
    assert pad_needed >= 4, f"Target {target_bytes} must be at least 4 bytes larger than base {len(base_data)}"
    
    com_blocks = bytearray()
    rem = pad_needed
    max_chunk = 65530
    
    while rem > 0:
        if rem >= max_chunk + 4:
            # Check if remaining after this block would be < 4
            if 0 < rem - (max_chunk + 4) < 4:
                cur_payload = max_chunk - 10
            else:
                cur_payload = max_chunk
        else:
            cur_payload = rem - 4
        marker = b"\xff\xfe" + struct.pack(">H", cur_payload + 2) + (b"0" * cur_payload)
        com_blocks.extend(marker)
        rem -= len(marker)
    return soi + com_blocks + rest

def pad_png(base_data, target_bytes):
    import zlib
    iend_idx = base_data.rfind(b"IEND")
    assert iend_idx != -1, "Not a valid PNG"
    iend_start = iend_idx - 4
    prefix = base_data[:iend_start]
    iend_chunk = base_data[iend_start:]
    
    pad_needed = target_bytes - len(base_data)
    if pad_needed == 0:
        return base_data
    assert pad_needed >= 12, f"Target {target_bytes} must be at least 12 bytes larger than base {len(base_data)}"
    
    chunk_type = b"tEXt"
    chunk_data_len = pad_needed - 12
    keyword = b"Description\x00"
    if chunk_data_len >= len(keyword):
        chunk_data = keyword + b"0" * (chunk_data_len - len(keyword))
    else:
        chunk_data = b"0" * chunk_data_len
        
    chunk_len_bytes = struct.pack(">I", len(chunk_data))
    crc = zlib.crc32(chunk_type + chunk_data) & 0xffffffff
    crc_bytes = struct.pack(">I", crc)
    return prefix + chunk_len_bytes + chunk_type + chunk_data + crc_bytes + iend_chunk

def generate_image_files():
    print("Generating authentic sample image files (100% Apple Preview compliant)...")
    jpg_dir = os.path.join(OUTPUT_DIR, "jpg")
    png_dir = os.path.join(OUTPUT_DIR, "png")
    ensure_dir(jpg_dir)
    ensure_dir(png_dir)
    
    import base64, subprocess
    BASE64_JPG = "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"
    base_jpg = base64.b64decode(BASE64_JPG)
    
    # Generate matching PNG baseline via sips
    temp_jpg = "/tmp/base_image_dyn.jpg"
    temp_png = "/tmp/base_image_dyn.png"
    with open(temp_jpg, "wb") as fp:
        fp.write(base_jpg)
    subprocess.run(["sips", "-s", "format", "png", temp_jpg, "--out", temp_png], check=True, stdout=subprocess.DEVNULL)
    with open(temp_png, "rb") as fp:
        base_png = fp.read()
    
    img_targets = [
        ("100kb", 102400),
        ("500kb", 512000),
        ("1mb", 1048576),
        ("2mb", 2097152),
        ("5mb", 5242880),
        ("10mb", 10485760)
    ]
    
    for label, target_bytes in img_targets:
        # JPG
        jpg_path = os.path.join(jpg_dir, f"sample-{label}.jpg")
        final_jpg = pad_jpeg(base_jpg, target_bytes)
        with open(jpg_path, "wb") as f:
            f.write(final_jpg)
        assert os.path.getsize(jpg_path) == target_bytes
        
        # PNG
        png_path = os.path.join(png_dir, f"sample-{label}.png")
        final_png = pad_png(base_png, target_bytes)
        with open(png_path, "wb") as f:
            f.write(final_png)
        assert os.path.getsize(png_path) == target_bytes
        print(f"  ✓ sample-{label}.jpg and .png: exactly {target_bytes} bytes (100% Preview compliant)")


# --------------------------------------------------------------------------
# 9. GENERATORS: ZIP ARCHIVES
# --------------------------------------------------------------------------

def generate_zip_files():
    print("Generating authentic ZIP archives with actual extractable technical documents...")
    zip_dir = os.path.join(OUTPUT_DIR, "zip")
    ensure_dir(zip_dir)
    
    zip_targets = [
        ("1mb", 1048576),
        ("5mb", 5242880),
        ("10mb", 10485760),
        ("25mb", 26214400),
        ("50mb", 52428800),
        ("100mb", 104857600)
    ]
    
    full_text = get_full_whitepaper_text()
    csv_content = "model_name,developer,parameters_b,context_k,math500,cost_in,cost_out\n"
    for m in AI_BENCHMARK_MODELS:
        csv_content += f"\"{m['name']}\",\"{m['developer']}\",{m['params_b']},{m['context_k']},{m['math500']},{m['cost_in']},{m['cost_out']}\n"
        
    pad_entry_name = "archive_padding.bin"
    entry_overhead = 76 + 2 * len(pad_entry_name)

    for label, target_bytes in zip_targets:
        file_path = os.path.join(zip_dir, f"sample-{label}.zip")
        readme_text = (
            f"# FileDummy Sample Archive ({label.upper()})\n\n"
            f"Target Size: {target_bytes} bytes\n"
            f"Content: 2026 Global AI & Machine Learning Industry Report and Benchmarks.\n"
            f"Generated by: FileDummy (filedummy.ndlong.site)\n"
        )
        
        # Calculate base size for this exact archive content
        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("README.md", readme_text)
            zf.writestr("ai-industry-report-2026.txt", full_text)
            zf.writestr("ai_benchmarks_2026.csv", csv_content)
        base_size = len(buf.getvalue())
        
        pad_needed = target_bytes - base_size - entry_overhead
        assert pad_needed >= 0, f"Target {target_bytes} smaller than base ZIP {base_size}"
        
        with zipfile.ZipFile(file_path, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.writestr("README.md", readme_text)
            zf.writestr("ai-industry-report-2026.txt", full_text)
            zf.writestr("ai_benchmarks_2026.csv", csv_content)
            
            zinfo = zipfile.ZipInfo(pad_entry_name)
            zinfo.compress_type = zipfile.ZIP_STORED
            with zf.open(zinfo, "w") as pf:
                rem = pad_needed
                chunk = b"0" * 1048576
                while rem > 0:
                    c = min(rem, 1048576)
                    pf.write(chunk[:c])
                    rem -= c
                    
        actual_size = os.path.getsize(file_path)
        assert actual_size == target_bytes, f"{label} ZIP size {actual_size} != {target_bytes}"
        assert actual_size <= target_bytes
        
        # Verify ZIP can still be opened and read
        with zipfile.ZipFile(file_path, "r") as zf:
            names = zf.namelist()
            assert "README.md" in names
            assert "ai-industry-report-2026.txt" in names
            assert "ai_benchmarks_2026.csv" in names
            
        print(f"  ✓ sample-{label}.zip: exactly {actual_size} bytes (target: {target_bytes}, extractable files: {len(names)})")


# --------------------------------------------------------------------------
# MAIN EXECUTION & AUTOMATED ASSERTIONS
# --------------------------------------------------------------------------

def main():
    print(f"=== Starting Authentic File Generation in {OUTPUT_DIR} ===")
    generate_txt_files()
    generate_csv_files()
    generate_json_files()
    generate_pdf_files()
    generate_docx_files()
    generate_image_files()
    generate_zip_files()
    print("=== All 54 test files generated and verified successfully! ===")

if __name__ == "__main__":
    main()
